import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { Form } from 'src/components/Form/Form';
import { Input, InputType } from 'src/components/Input/Input';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { updateProfile } from 'src/store/thunks/profile/UpdateProfile';

import styles from './Profile.module.scss';
import { ScrollAnchor } from 'src/components/ScrollAnchor/ScrollAnchor';
import { Card } from 'src/components/Card/Card';
import { OrganizationInfo, UserInfo } from 'src/entities/Forms';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { updateProfileDocument } from 'src/store/thunks/profile/UpdateProfileDocument';
import { deletedProfileDocument } from 'src/store/thunks/profile/DeletedProfileDocument';
import { downloadProfileDocument } from 'src/store/thunks/profile/DownloadProfileDocument';
import Toast from 'src/components/Toast';

import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'src/entities/Routes';
import { CertsModal } from '../Requests/Request/new/modals/Certs/CertsModal';
import { Loader } from 'src/components/Loader/Loader';
import { Button, Type } from 'src/components/Button/Button';
import { DocumentStatuses } from 'src/entities/Statuses';
import { signDocs } from 'src/store/thunks/profile/SignProfileDocument';
import { verifDocs } from 'src/store/thunks/profile/VerifProfileDocuments';
import { apiClient } from 'src/api/client/ApiClient';
import { AxiosResponse } from 'axios';
import { getCerts, getSigner } from 'src/common/utils/blitz';
import { ScrollWithShadow } from 'src/components/ScrollWithShadow/ScrollWithShadow';
import { signError, SignError } from 'src/common/utils/signError';
import { Notification } from 'src/pages/Notifications/NotificationsSlice';
export const disabledFields = ['user_last_name', 'user_first_name'];

export const disabledFieldsOrg = [
  'org_name',
  'org_name_short',
  'org_organization_form',
  'org_OGRN',
  'org_CPP',
  'org_address_legal',
  'org_address',
  'org_OKVED',
  'org_OCPO',
  'org_OGRNIP',
  'org_inn',
];
interface ProfileProps {
  profileCard: ReactNode;
}

enum StepDocuments {
  Inaction = 'Inaction',
  Signing = 'Signing',
  Verification = 'Verification',
}

const Profile: FC<ProfileProps> = ({ profileCard }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storage = localStorage;

  const { notifications } = useAppSelector(
    (state) => state.notificationsReducer
  );

  const { profile, isLoading } = useAppSelector(
    (state) => state.profileReducer
  );
  const { user, organization } = profile;

  const mainSectionRef = useRef<HTMLDivElement | null>(null);
  const companySectionRef = useRef<HTMLDivElement | null>(null);
  const docsSectionRef = useRef<HTMLDivElement | null>(null);

  const [certs, setCerts] = useState<Array<any>>([]);
  const [certsShown, setCertsShown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [stepDocuments, setStepDocuments] = useState(StepDocuments.Inaction);

  const sortedUserInfo = {
    user_id: profile.user.user_id,
    user_last_name: profile.user.user_last_name,
    user_first_name: profile.user.user_first_name,
    user_middle_name: profile.user.user_middle_name,
    user_phone: profile.user.user_phone,
    user_post: profile.user.user_post,
  };

  useEffect(() => {
    const usedNotifications = getUsedNotification();

    setTimeout(() => {
      if (notifications.length) {
        notifications.forEach((notification) => {
          if (!usedNotifications.includes(notification.number.toString())) {
            usedNotifications.push(notification.number);
            storage.setItem('notifications', JSON.stringify(usedNotifications));
            sendNotification(notification);
          }
        });
      }
    }, 3000);
  }, []);

  // TODO: add types and change double equals, move a function above its usage, make notifications input data

  const getUsedNotification: () => string[] = () => {
    let usedNotifications = JSON.parse(
      storage.getItem('notifications') || '[]'
    );

    usedNotifications = usedNotifications.filter((usedNotification: any) => {
      let isInRequest = false;
      notifications.map((n) => {
        if (usedNotification == n.number) {
          isInRequest = true;
        }
      });

      return isInRequest;
    });

    return usedNotifications;
  };

  const sendNotification = (notification: Notification) => {
    const body = () => (
      <>
        <div className={styles.Notification}>
          Номер заявки: № {notification.number}
        </div>
        <div className={styles.Notification}>Дата: {notification.date}</div>
        <p>{notification.notification}</p>
      </>
    );
    Toast(body, {
      type: 'error',
      onClick: () => {
        navigate(`${RoutePaths.REQUESTS}/${notification.number}`);
      },
    });
  };

  useEffect(() => {
    const NotSignedDoc = profile.documents.filter(
      (field) => field.file.status === DocumentStatuses.NotSigned
    );
    const SignedDoc = profile.documents.filter(
      (field) => field.file.status === DocumentStatuses.Signed
    );
    if (NotSignedDoc.length) {
      setStepDocuments(StepDocuments.Signing);
    } else if (SignedDoc.length && !NotSignedDoc.length) {
      setStepDocuments(StepDocuments.Verification);
    } else {
      setStepDocuments(StepDocuments.Inaction);
    }
  }, [profile.documents]);

  const handleVerif = async () => {
    const signedDocs = profile.documents.filter(
      (doc) => doc.id != '' && doc.file.status === DocumentStatuses.Signed
    );
    for (const key in signedDocs) {
      dispatch(verifDocs(signedDocs[key].id));
    }
    Toast('Документы отправлены на верификацию', {
      type: 'success',
    });
  };

  const handleSign = async () => {
    try {
      setLoading(true);
      const certs = await getCerts();
      setCerts(certs as any);
      setCertsShown(true);
    } catch (err: any) {
      if (err.message) {
        Toast(err.message, {
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadBase64ProfileDocument = async (
    idDoc: string
  ): Promise<AxiosResponse<string> | void> => {
    try {
      return apiClient.get<string>(`/docs?id=${idDoc}&base64=true`);
    } catch (e: any) {
      Toast(e.message, {
        type: 'error',
      });
    }
  };

  const signDocumentsByCert = async (cert: any) => {
    try {
      setCertsShown(false);
      const documents = profile.documents;
      setLoading(true);
      const signer: any = await getSigner(cert);
      const unSignedDocs = documents.filter(
        (doc) => doc.id != '' && doc.file.status === DocumentStatuses.NotSigned
      );
      for (const key in unSignedDocs) {
        const docId = unSignedDocs[key].id;
        const base64Doc = await downloadBase64ProfileDocument(docId);
        if (!base64Doc) return;
        await signer.add_data_in_base64(base64Doc.data);
        const signature = await signer.finish();
        dispatch(signDocs(docId, signature));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      signError(err as SignError);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (formData: any) => {
    const formKeys = Object.keys(formData);
    const userData: any = {};
    const orgData: any = {};

    formKeys.forEach((key) => {
      if (key.indexOf('user_') === 0) {
        return (userData[key] = formData[key]);
      }
      if (key.indexOf('org_') === 0) {
        return (orgData[key] = formData[key]);
      }
    });

    dispatch(
      updateProfile({
        ...profile,
        user: userData,
        organization: orgData,
      })
    );

    successNotification();
  };

  const successNotification = () =>
    Toast('Изменения сохранены', {
      type: 'success',
    });

  return (
    <div className={styles.Profile}>
      {isLoading ? (
        <>
          <Skeleton rows={2} withLogo />
          <Skeleton rows={5} withTitle />
          <Skeleton rows={7} withTitle />
          <Skeleton rows={3} withTitle />
        </>
      ) : (
        <>
          {loading && <Loader />}
          <CertsModal
            certs={certs}
            shown={certsShown}
            onHide={() => setCertsShown(false)}
            onCertSelect={signDocumentsByCert}
          />
          {profileCard}
          <ScrollWithShadow className={styles.ProfileSectionAnchors}>
            <ScrollAnchor
              title="Данные представителя"
              anchorRef={mainSectionRef}
            />
            <ScrollAnchor
              title={`Данные ${
                organization.org_type === 'company' ? 'юр. лица' : 'ИП'
              }`}
              anchorRef={companySectionRef}
            />
            <ScrollAnchor title="Документы" anchorRef={docsSectionRef} />
          </ScrollWithShadow>
          <Form
            changeTracking
            defaultValues={{
              ...user,
              ...organization,
            }}
            onSubmit={handleSubmit}
            isDisabledOriginally
          >
            <div ref={mainSectionRef} />
            <Card
              title="Данные представителя"
              collapsible
              collapsed
              rememberState
            >
              {Object.keys(sortedUserInfo)
                .filter((key) => key !== 'user_id')
                .map((key) => (
                  <Input
                    key={key}
                    name={key}
                    label={UserInfo[key as keyof typeof UserInfo]}
                    type={
                      /phone/.test(key)
                        ? InputType.Phone
                        : /email/.test(key)
                        ? InputType.Email
                        : InputType.Text
                    }
                    disabled={disabledFields.includes(key)}
                  />
                ))}
            </Card>
            <div ref={companySectionRef} />
            <Card
              title={`Данные\n ${
                organization.org_type === 'company'
                  ? 'юридического лица'
                  : 'индивидуального предпринимателя'
              }`}
              collapsible
              collapsed
              rememberState
            >
              {Object.keys(organization)
                .filter((key) => key !== 'org_id' && key !== 'org_type')
                .map((key) => (
                  <Input
                    key={key}
                    name={key}
                    disabled={disabledFieldsOrg.includes(key)}
                    label={
                      OrganizationInfo[key as keyof typeof OrganizationInfo]
                    }
                    type={
                      key.includes('phone') ? InputType.Phone : InputType.Text
                    }
                    required={false}
                  />
                ))}
            </Card>
            <div ref={docsSectionRef} />
            <Card title="Документы" collapsible collapsed rememberState>
              <div className={styles.ProfileDocuments}>
                <div className={styles.ProfileDocumentsRow}>
                  {profile.documents.map((field) => (
                    <DocumentUploader
                      isData
                      deletable
                      download
                      key={field.type}
                      documentUploaded={field.file}
                      documentType={field.docType}
                      documentName={field.title}
                      onUpload={(file) =>
                        dispatch(updateProfileDocument(file, field.type))
                      }
                      onDelete={() =>
                        dispatch(deletedProfileDocument(field.id))
                      }
                      onDownload={() =>
                        dispatch(
                          downloadProfileDocument(
                            field.id,
                            `${field.title}.${field.docType}`
                          )
                        )
                      }
                    />
                  ))}
                </div>
                <div className={styles.ProfileDocumentsButton}>
                  {stepDocuments === StepDocuments.Signing && (
                    <Button
                      buttonType={Type.Button}
                      onClick={() => handleSign()}
                      checkMobile
                    >
                      Подписать
                    </Button>
                  )}
                  {stepDocuments === StepDocuments.Verification && (
                    <Button
                      buttonType={Type.Button}
                      onClick={() => handleVerif()}
                    >
                      Отправить на верификацию
                    </Button>
                  )}
                  {stepDocuments === StepDocuments.Inaction && (
                    <div style={{ width: '56px', height: '56px' }} />
                  )}
                </div>
              </div>
            </Card>
          </Form>
        </>
      )}
    </div>
  );
};

export default Profile;
