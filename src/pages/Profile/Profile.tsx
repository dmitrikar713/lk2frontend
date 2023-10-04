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
import axios, { AxiosResponse } from 'axios';
import { getCerts, getSigner } from 'src/common/utils/blitz';
import { ScrollWithShadow } from 'src/components/ScrollWithShadow/ScrollWithShadow';
import { signError, SignError } from 'src/common/utils/signError';
import { Notification } from 'src/pages/Notifications/NotificationsSlice';
import { ProfileSegments } from 'src/components/Cards/ProfileInfo/ProfileInfo';
import { ForwardLink } from 'src/components/ForwardLink/ForwardLink';
import { PieChart } from 'src/components/PieChart/PieChart';
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
  const exportTextResult = useAppSelector(
    (state) => state.profileReducer.profile.exportTestResult
  );

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

  async function testFunction() {
    await apiClient
      .post('/profile/getCrmContact', { inn: '771378334260' })
      .then((resp) => console.log(resp));
  }

  const exportPlfrms = [
    {
      id: 1,
      name: 'Алибаба',
      picUrl:
        'data:image/png;base64,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',
    },
  ];
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

            {/* <Button onClick={() => testFunction()}> Создать мок акк</Button> */}

            {/* Тест экспортной готовности */}
            <Card>
              <div className={styles.ExportCard}>
                <div className={styles.ExportCardText}>
                  <h3 className={styles.CardTitle}>
                    Тест экспортной готовности
                  </h3>
                  <p>Результаты теста экспортной готовности</p>
                  <ForwardLink title="Пройдите тест" path="/exports" />
                </div>

                {exportTextResult && (
                  <PieChart
                    size={100}
                    lineWidth={25}
                    colors={['#ff4361', '#F2F2F2']}
                    data={[exportTextResult, 100 - exportTextResult]}
                  />
                )}
              </div>
            </Card>

            {/* Маршрутизатор */}
            <Card>
              <div className={styles.CardContent}>
                <div className={styles.Testrouter}>
                  <h3 className={styles.CardTitle}>Маршрутизатор</h3>
                  <p>
                    Пройдите тест и получите рекомендации подходящей для Вас{' '}
                    <span
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      e-commerce
                    </span>{' '}
                    программы
                  </p>
                  <ForwardLink title="Пройдите тест" path="/Testrouter" />
                  <div className={styles.TestrouterPlatforms}>
                    {exportPlfrms.map((pl: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={styles.TestrouterPlatformsItem}
                          onClick={() => {
                            if (pl.url) {
                              location.href = pl.url;
                            }
                          }}
                        >
                          <img src={pl.picUrl} alt="" />
                          <p>{pl.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

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

// Кнопки для скролла к разделам, убрал в связи с изменением дизайна
// <ScrollWithShadow className={styles.ProfileSectionAnchors}>
// <ScrollAnchor
//   title="Данные представителя"
//   anchorRef={mainSectionRef}
// />
// <ScrollAnchor
//   title={`Данные ${
//     organization.org_type === 'company' ? 'юр. лица' : 'ИП'
//   }`}
//   anchorRef={companySectionRef}
// />
// <ScrollAnchor title="Документы" anchorRef={docsSectionRef} />
// </ScrollWithShadow>
