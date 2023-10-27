import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { ForwardLink } from 'src/components/ForwardLink/ForwardLink';
import { Modal } from 'src/components/Modal/Modal';
import { ProfileIcons } from 'src/components/ProfileIcons/ProfileIcons';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchRequest } from 'src/store/thunks/requests/FetchRequest';
import styles from './ExistingRequest.module.scss';
import cx from 'classnames';
import { RoutePaths } from 'src/entities/Routes';
import { Stage } from 'src/components/Stage/Stage';
import { DocumentStatuses, RequestStatus } from 'src/entities/Statuses';
import { CertsModal } from '../new/modals/Certs/CertsModal';
import { Loader } from 'src/components/Loader/Loader';
import { getCerts, getSigner } from 'src/common/utils/blitz';
import Toast from 'src/components/Toast';
import {
  FileSignature,
  RequestAction,
  requestSlice,
  UploadedDocuments,
} from '../RequestSlice';
import { invokeRppAction } from 'src/store/thunks/requests/FetchAdditionalFile';
import { getBase64Url } from 'src/common/utils/base64Url';
import { RequestSubstages } from 'src/entities/Subjects';
import { signError, SignError } from 'src/common/utils/signError';
import {
  Actions,
  CancelButton,
  CancelRequest,
  ConfirmationSteps,
} from './enums';

export const ExistingRequest: FC = () => {
  const { requestId } = useParams();
  const dispatch = useAppDispatch();
  const { request, isLoading } = useAppSelector(
    (state) => state.requestReducer
  );
  const navigate = useNavigate();
  const notifications = useAppSelector(
    (state) => state.notificationsReducer.notifications
  );

  const [revokeModalShown, setRevokeModalShown] = useState<boolean>(false);
  const [NavBarShow, setNavBarShow] = useState<boolean>(true);
  const [certs, setCerts] = useState<Array<any>>([]);
  const [certsShown, setCertsShown] = useState<boolean>(false);
  const [additionalDocs, setAdditionalDocs] = useState<boolean>(false);
  const [addAct, setAddAct] = useState<boolean>(false);
  const [recallRequest, setRecallRequest] = useState<boolean>(false);
  const [cancelRequest, setCancelRequest] = useState<boolean>(false);
  const [additionalRecall, setAdditionalRecall] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalType, setModalType] = useState<Actions>(Actions.recallRequest);
  const [modalName, setModalName] = useState<string>('');
  const [docsSigned, setDocsSigned] = useState<boolean>(false);
  const [activeStages, setActiveStages] = useState<boolean>(false);

  const completedStages = request.stages.filter(
    (stage) => stage.status === RequestStatus.Closed
  ).length;

  const [loading, setLoading] = useState<boolean>(false);
  const [step, setNextStep] = useState<ConfirmationSteps>(
    ConfirmationSteps.Sign
  );

  async function handleRequest(type: Actions) {
    const data = {} as RequestAction;
    data.requestId = String(request.number);
    const action = request.actions.find((action) => action.name === type);
    if (action) {
      data.actionId = action.actionId;
      setLoading(true);
      await dispatch(invokeRppAction(data, 'Заявка отозвана'));
      setRevokeModalShown(false);
      setLoading(false);
    } else {
      Toast('Ошибка отзыва заявки', {
        type: 'error',
      });
    }
  }

  function handleClick(
    title: CancelButton,
    type: Actions,
    name: CancelRequest
  ) {
    setRevokeModalShown(true);
    setModalTitle(title);
    setModalType(type);
    setModalName(name);
  }

  async function handleSendDocs(actionType: string) {
    const data = {} as RequestAction;
    let curSubStage: RequestSubstages | undefined;
    data.requestId = String(request.number);
    const curStage = request.stages.find(
      (stage) => stage && stage.status === RequestStatus.inWork
    );
    if (curStage)
      curSubStage = curStage.substages.find(
        (subStage) => subStage.status === RequestStatus.inWork
      );

    if (curSubStage) data.currentStage = curSubStage.code;

    const action = request.actions.find((action) => action.name === actionType);
    if (action) data.actionId = action.actionId;
    const documents = request.uploadedDocuments;

    Object.keys(documents).map((key) => {
      const { file, fileName, signature, status, title } = documents[key];
      if (status === DocumentStatuses.Signed && file) {
        const docData = {} as FileSignature;
        docData.file = file
          ? file.includes('base64')
            ? file.split('base64,')[1]
            : file
          : '';
        docData.fileName = fileName;
        docData.signature = signature ? signature : '';
        docData.title = title ? title : '';
        data[key] = docData;
      }
    });

    if (!data.actionId || !data.requestId)
      Toast('Неверные параметры запроса', {
        type: 'error',
      });
    else {
      setLoading(true);
      await dispatch(invokeRppAction(data));
      setLoading(false);
      Toast('Документы отправлены', {
        type: 'success',
      });
    }
  }

  async function handleSign() {
    try {
      setLoading(true);
      const certs = await getCerts();
      setCerts(certs as any);
      setCertsShown(true);
      setNextStep(ConfirmationSteps.Send);
    } catch (err: any) {
      if (err.message) {
        Toast(err.message, {
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function signDocumentsByCert(cert: any) {
    const signatures: any = {};

    try {
      setCertsShown(false);
      const documents = request.uploadedDocuments;
      const documentsKeys = Object.keys(documents);
      setLoading(true);
      const signer: any = await getSigner(cert);

      const signaturesArr = {} as any;
      for (const key in documentsKeys) {
        let base64Doc = '';
        const url = request.uploadedDocuments[documentsKeys[key]].url;
        signaturesArr[documentsKeys[key]] = { file: '', signature: '' };
        if (
          request.uploadedDocuments[documentsKeys[key]].file &&
          request.uploadedDocuments[documentsKeys[key]].status ===
            DocumentStatuses.Empty
        ) {
          base64Doc =
            request.uploadedDocuments[documentsKeys[key]].file!.split(
              'base64,'
            )[1];
        } else if (
          url &&
          request.uploadedDocuments[documentsKeys[key]].status ===
            DocumentStatuses.Empty
        ) {
          base64Doc = await getBase64Url(url);
          signaturesArr[documentsKeys[key]].file = base64Doc;
        }
        if (base64Doc !== '') {
          await signer.add_data_in_base64(base64Doc);
          const signature = await signer.finish();
          signaturesArr[documentsKeys[key]].signature = signature;
        }
      }
      let currentKey = 0;
      for (const i in documents) {
        dispatch(
          requestSlice.actions.setDocument({
            key: documentsKeys[currentKey] as keyof UploadedDocuments,
            document: {
              file: signaturesArr[i].file
                ? signaturesArr[i].file
                : documents[
                    documentsKeys[currentKey] as keyof UploadedDocuments
                  ].file,
              status: signaturesArr[i]
                ? DocumentStatuses.Signed
                : documents[
                    documentsKeys[currentKey] as keyof UploadedDocuments
                  ].status,
              uploadedAt:
                documents[documentsKeys[currentKey] as keyof UploadedDocuments]
                  .uploadedAt,
              signature: signaturesArr[i]
                ? window.btoa(
                    signaturesArr[i].signature.substring(
                      0,
                      signaturesArr[i].signature.length - 1
                    )
                  )
                : '',
              fileName:
                documents[documentsKeys[currentKey] as keyof UploadedDocuments]
                  .fileName,
              title:
                documents[documentsKeys[currentKey] as keyof UploadedDocuments]
                  .title,
              type: documents[
                documentsKeys[currentKey] as keyof UploadedDocuments
              ].type,
            },
          })
        );
        signatures[documentsKeys[currentKey++]] = i;
        setDocsSigned(true);
      }
    } catch (err) {
      setAdditionalDocs(true);
      signError(err as SignError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => dispatch(fetchRequest(requestId)), []);

  useEffect(() => {
    completedStages === request.stages.length
      ? setNavBarShow(false)
      : setNavBarShow(true);

    if (request.actions) {
      setAdditionalDocs(false);
      setRecallRequest(false);
      setCancelRequest(false);
      setAdditionalRecall(false);
      setAddAct(false);
      request.actions.forEach((action) => {
        if (action.name === Actions.additionalDocs && action.active == true) {
          setAdditionalDocs(true);
        } else if (
          action.name === Actions.recallRequest &&
          action.active == true
        ) {
          setRecallRequest(true);
        } else if (
          action.name === Actions.cancelRequest &&
          action.active === true
        )
          setCancelRequest(true);
        else if (
          action.name === Actions.recallAdditionalRequest &&
          action.active === true
        )
          setAdditionalRecall(true);
        else if (action.name === Actions.addAct && action.active === true)
          setAddAct(true);
      });
    }

    Object.keys(request.uploadedDocuments).map((key) => {
      if (request.uploadedDocuments[key].status !== DocumentStatuses.Signed) {
        setDocsSigned(false);
      }
    });

    if (
      !request.stages.filter((stage) => stage.status === RequestStatus.inWork)
        .length
    ) {
      setActiveStages(false);
    } else {
      setActiveStages(true);
    }
  }, [request]);

  return (
    <>
      <div className={styles.Request}>
        {loading && <Loader />}
        <CertsModal
          certs={certs}
          shown={certsShown}
          onHide={() => setCertsShown(false)}
          onCertSelect={signDocumentsByCert}
        />
        {isLoading ? (
          <>
            <Skeleton rows={1} withTitle />
            <Skeleton rows={7} withTitle />
            <Skeleton rows={7} withTitle />
          </>
        ) : (
          <>
            {NavBarShow && (
              <div className={styles.RequestNavBarSticky}>
                <div className={styles.RequestNavBar}>
                  {request.stages.map((stage) => (
                    <div
                      key={stage.stageOrder}
                      className={styles.RequestNavBarStatus}
                    >
                      <span
                        className={cx(
                          stage.status === RequestStatus.inWork ||
                            stage.status === RequestStatus.Closed
                            ? styles.RequestStatusNumberProcessing
                            : styles.RequestStatusNumber
                        )}
                      >
                        {stage.stageOrder}
                      </span>
                      <span
                        className={
                          stage.status === RequestStatus.inWork
                            ? styles.RequestNavBarProcessing
                            : styles.RequestNavBarCompleted
                        }
                      >
                        {stage.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Card>
              <div className={styles.RequestInfo}>
                <div className={styles.RequestWrapper}>
                  <Breadcrumbs
                    withArrowBack
                    breadcrumbList={[
                      {
                        title: 'Назад в заявки',
                        path: `${RoutePaths.REQUESTS}`,
                      },
                    ]}
                  />
                  <ProfileIcons
                    barWithSettings
                    notifications={notifications.length}
                    onClick={() => navigate(RoutePaths.NOTIFICATIONS)}
                  />
                </div>
                <div className={styles.RequestInfoService}>
                  {request.serviceName}
                </div>
                <div className={styles.RequestInfoExtra}>
                  №{request.number} от {request.createdAt}
                </div>
                <ForwardLink
                  title="Посмотреть заявку"
                  path={`${RoutePaths.REQUEST_DETAILS}/${request.number}`}
                />
              </div>
            </Card>
            <Card title="Пройдено этапов">
              <ProgressBar
                currentStep={completedStages}
                steps={request.stages.length}
              />
              {request.stages
                // .filter((stage) => stage.status !== RequestStatus.Pending)
                .map((stage) => (
                  <Stage
                    key={stage.title}
                    stage={stage}
                    docs={request.uploadedDocuments}
                  />
                ))}
            </Card>
            <div className={styles.RequestStickyButtonsWrapper}>
              {recallRequest && (
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => {
                    handleClick(
                      CancelButton.Recall,
                      Actions.recallRequest,
                      CancelRequest.Recall
                    );
                  }}
                >
                  {CancelRequest.Recall}
                </Button>
              )}
              {cancelRequest && (
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => {
                    handleClick(
                      CancelButton.Cancell,
                      Actions.cancelRequest,
                      CancelRequest.Cancell
                    );
                  }}
                >
                  {CancelRequest.Cancell}
                </Button>
              )}
              {additionalRecall && (
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => {
                    handleClick(
                      CancelButton.Recall,
                      Actions.recallAdditionalRequest,
                      CancelRequest.Recall
                    );
                  }}
                >
                  {CancelRequest.Recall}
                </Button>
              )}
              {(additionalDocs || addAct) && !docsSigned && activeStages && (
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => handleSign()}
                  checkMobile
                >
                  Подписать документы
                </Button>
              )}
              {docsSigned && additionalDocs && step === ConfirmationSteps.Send && (
                <>
                  <Button
                    type={ButtonType.Secondary}
                    onClick={() => {
                      handleSendDocs(Actions.additionalDocs);
                      setAdditionalDocs(false);
                    }}
                  >
                    Отправить документы
                  </Button>
                </>
              )}
              {docsSigned && addAct && (
                <>
                  <Button
                    type={ButtonType.Secondary}
                    onClick={() => {
                      handleSendDocs(Actions.addAct);
                      setAddAct(false);
                    }}
                  >
                    Отправить акт
                  </Button>
                </>
              )}
            </div>
            <Modal
              title={modalTitle}
              isShown={revokeModalShown}
              onHide={() => setRevokeModalShown(!revokeModalShown)}
            >
              <div className={styles.RequestRevokeControls}>
                <Button onClick={() => handleRequest(modalType)}>
                  {modalName}
                </Button>
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => setRevokeModalShown(!revokeModalShown)}
                >
                  Продолжить
                </Button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
