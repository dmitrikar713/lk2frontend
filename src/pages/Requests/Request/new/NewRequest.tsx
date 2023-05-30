import React, { FC, useEffect, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Loader } from 'src/components/Loader/Loader';
import { RoutePaths } from 'src/entities/Routes';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { CertsModal } from './modals/Certs/CertsModal';
import styles from './NewRequest.module.scss';
import {
  UploadedDocument,
  requestSlice,
  UploadedDocuments,
} from '../RequestSlice';
import { ConfirmingStep } from './steps/ConfirmingStep';
import { FillingStep } from './steps/FillingStep';
import { SigningStep } from './steps/SigningStep';
import { SendStep } from './steps/SendStep';
import { createRequest } from 'src/store/thunks/requests/CreateRequest';
import { DocumentStatuses } from 'src/entities/Statuses';
import Toast from 'src/components/Toast';
import { useNavigate } from 'react-router-dom';
import { fetchRequestConfig } from 'src/store/thunks/requests/FetchRequestConfig';
import { Card } from 'src/components/Card/Card';
import { PrinterIcon } from 'src/styles/icons/printer';
import { ProfileIcons } from 'src/components/ProfileIcons/ProfileIcons';
import { getCerts, getSigner } from 'src/common/utils/blitz';
import { printFile } from 'src/common/utils/printFile';
import { fetchPrintedVersionWithStamp } from 'src/store/thunks/printed-version/FetchPrintedVersionWithStamp';
import { signError, SignError } from 'src/common/utils/signError';

enum StepButton {
  Fill = 'Далее',
  Confirm = 'Подтвердить',
  Sign = 'Подписать',
  Send = 'Отправить',
}

export const NewRequest: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { request, printedVersionWithStamp } = useAppSelector(
    (state) => state.requestReducer
  );
  const notifications = useAppSelector(
    (state) => state.notificationsReducer.notifications
  );
  const { profile } = useAppSelector((state) => state.profileReducer);

  const { formData, serviceId, uploadedDocuments, serviceName } = request;
  const { user, organization } = profile;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [certs, setCerts] = useState<Array<any>>([]);
  const [certsShown, setCertsShown] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchRequestConfig(serviceId));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    currentStep === 3 &&
      dispatch(
        fetchPrintedVersionWithStamp({
          fields: {
            inn: organization.org_inn,
            LastName: user.user_last_name,
            FirstName: user.user_first_name,
            MiddleName: user.user_middle_name,
            Phone: user.user_phone,
            guid: serviceId,
            ...formData,
          },
          certs: { ...certs[0].info },
        })
      );
  }, [currentStep]);

  const handleSign = async () => {
    setButtonDisabled(true);

    const allDocumentsUploaded = Object.values(uploadedDocuments).reduce(
      (acc: boolean, next: UploadedDocument) => (!next.file ? false : acc),
      true
    );

    if (!allDocumentsUploaded) {
      Toast('Для подписания загрузите все документы', {
        type: 'error',
      });
      return;
    }

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
      setButtonDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const signDocumentsByCert = async (cert: any) => {
    const signatures: any = {};

    try {
      setCertsShown(false);
      const documents = uploadedDocuments;
      const documentsKeys = Object.keys(documents);
      setLoading(true);
      const signer: any = await getSigner(cert);

      const signaturesArr = {} as any;
      for (const key in documentsKeys) {
        await signer.add_data_in_base64(
          uploadedDocuments[documentsKeys[key]].file!.split('base64,')[1]
        );
        const signature = await signer.finish();
        signaturesArr[documentsKeys[key]] = signature;
      }
      let currentKey = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const i in documents) {
        dispatch(
          requestSlice.actions.setDocument({
            key: documentsKeys[currentKey] as keyof UploadedDocuments,
            document: {
              file: documents[
                documentsKeys[currentKey] as keyof UploadedDocuments
              ].file,
              status: DocumentStatuses.Signed,
              uploadedAt:
                documents[documentsKeys[currentKey] as keyof UploadedDocuments]
                  .uploadedAt,
              signature: window.btoa(
                signaturesArr[i].substring(0, signaturesArr[i].length - 1)
              ),
              fileName:
                documents[documentsKeys[currentKey] as keyof UploadedDocuments]
                  .fileName,
              type: documents[
                documentsKeys[currentKey] as keyof UploadedDocuments
              ].type,
            },
          })
        );
        signatures[documentsKeys[currentKey++]] = i;
      }
      setCurrentStep(currentStep + 1);
    } catch (err) {
      signError(err as SignError);
      setButtonDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (nextStep: number | string) => {
    setButtonDisabled(false);

    if (nextStep !== 'sign docs') {
      setCurrentStep(currentStep + Number(nextStep));
    } else {
      setLoading(true);

      const form: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        form[key] = { type: 'plain', value };
      });
      Object.entries(uploadedDocuments).forEach(
        ([key, value]) =>
          (form[key] = {
            type: 'complex',
            value: {
              file: value.file,
              signature: value.signature,
            },
          })
      );

      await dispatch(createRequest(request));
      navigate(RoutePaths.REQUESTS);
      setLoading(false);
    }
  };

  const steps = [
    <FillingStep
      key={0}
      onSubmit={handleSubmit}
      submitTitle={StepButton.Fill}
    />,
    <ConfirmingStep
      key={1}
      onSubmit={handleSubmit}
      submitTitle={StepButton.Confirm}
    />,
    <SigningStep
      key={2}
      onSubmit={handleSign}
      onClick={handleSubmit}
      submitTitle={StepButton.Sign}
      buttonDisabled={buttonDisabled}
    />,
    <SendStep key={3} onSubmit={handleSubmit} submitTitle={StepButton.Send} />,
  ];

  return (
    <div className={styles.Request}>
      {loading && <Loader />}
      <CertsModal
        certs={certs}
        shown={certsShown}
        onHide={() => {
          setButtonDisabled(false);
          setCertsShown(false);
        }}
        onCertSelect={signDocumentsByCert}
      />
      <Card className={styles.CardTitle} styleWithBorder>
        <>
          <div className={styles.RequestTopPanelSection}>
            <Breadcrumbs
              withArrowBack
              breadcrumbList={[
                {
                  title: 'Назад в Бизнесмаркет',
                  path: 'https://moscow.business/business-market/',
                },
              ]}
            />
            <ProfileIcons
              barWithSettings
              notifications={notifications.length}
              onClick={() => navigate('/requests')}
            />
          </div>
          <div className={styles.RequestTopPanelSection}>
            {currentStep === 1 ? (
              <div className={styles.RequestTopPanelButtons}>
                <div className={styles.RequestTopPanelButton} />
              </div>
            ) : currentStep === 3 ? (
              <div className={styles.RequestTopPanelButtons}>
                <div
                  onClick={() => printFile(printedVersionWithStamp)}
                  className={styles.RequestTopPanelButton}
                >
                  <PrinterIcon />
                  <span className={styles.RequestTopPanelButtonText}>
                    Распечатать
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.RequestTopPanelTitle}>
                {serviceName || 'Услуга'}
              </div>
            )}
            <span className={styles.RequestTopPanelDate}>
              {new Date().toLocaleDateString('ru')}
            </span>
          </div>
        </>
      </Card>
      {steps[currentStep]}
    </div>
  );
};
