import React, { FC, ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './Requests.module.scss';
import { Request, RequestFilter, RequestFilterTitle } from './RequestsSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchRequests } from 'src/store/thunks/requests/FetchRequests';
import { NotificationIcon } from 'src/styles/icons/notification';
import { Button } from 'src/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Card } from 'src/components/Card/Card';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { NotificationModal } from './Request/modals/Notification/NotificationModal';
import { RequestStatuses } from 'src/entities/Statuses';
import { requestsStatusesInfo } from './configs/statuses';
import { BinIcon } from 'src/styles/icons/bin';
import { FeedbackModal } from './Request/new/modals/Feedback/FeedbackModal';
import {
  removeAllDraft,
  removeDraft,
} from 'src/store/thunks/requests/RemoveDraft';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { RoutePaths } from 'src/entities/Routes';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchServices } from 'src/store/thunks/services/FetchServices';
// import Toast from 'src/components/Toast';
export interface RequestsProps {
  profileCard: ReactNode;
}

const requestFilters = [
  {
    title: RequestFilterTitle.All,
    value: 'All',
  },
  {
    title: RequestFilterTitle.Processing,
    value: 'Processing',
  },
  {
    title: RequestFilterTitle.Completed,
    value: 'Completed',
  },
  {
    title: RequestFilterTitle.Draft,
    value: 'Draft',
  },
];

const Requests: FC<RequestsProps> = ({ profileCard }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.servicesReducer);
  const { isLoading, requests } = useAppSelector(
    (state) => state.requestsReducer
  );
  const [activeFilter, setActiveFilter] = useState<RequestFilter>(
    requestFilters[0]
  );
  const [notificationShown, setNotificationShown] = useState<boolean>(false);
  const [currentRequest, setCurrentRequest] = useState<Request>({
    id: '',
    serviceName: '',
    number: '',
    createdAt: '',
    statusName: RequestStatuses.Draft,
    smileIcon: '',
    notification: '',
    stages: [],
    serviceId: '',
  });

  const initShownLength = 10;

  const [shownRequests, setShownRequests] = useState<number>(initShownLength);
  const [disabledDeleteAll, setDisabledDeleteAll] = useState<boolean>(false);

  const handleNotificationShown = (request: Request) => {
    setCurrentRequest(request);
    setNotificationShown(true);
  };

  const getStatusColor = (statusName: RequestStatuses) => {
    switch (statusName) {
      case RequestStatuses.Draft:
        return 'Draft';
      case RequestStatuses.Closed:
        return 'Closed';
      case RequestStatuses.ServiceProvided:
        return 'ServiceProvided';
      case RequestStatuses.AdditionalRequest || RequestStatuses.Penalties:
        return 'WithNotification';
      default:
        return 'Default';
    }
  };

  const showMore = () => setShownRequests(shownRequests + 10);

  const handleChangeFilter = (filter: RequestFilter) => {
    setShownRequests(initShownLength);
    setActiveFilter(filter);
  };

  const filterRequests = (requests: Array<Request>): Array<Request> => {
    return requests.filter((request) => {
      if (activeFilter === requestFilters[0]) {
        return (
          request.statusName !== RequestStatuses.Draft &&
          request.serviceName ===
            'Продвижение в сфере международной электронной торговли'
        );
      }
      return (
        requestsStatusesInfo[request.statusName].common_status ===
          activeFilter.value &&
        request.serviceName ===
          'Продвижение в сфере международной электронной торговли'
      );
    });
  };

  // const [updatedRequest, setUpdatedRequest] = useState(requests);

  // Пуш уведомление, если заявки были обновлены и/или их статусы

  // useEffect(() => {
  //   if (JSON.stringify(updatedRequest) !== JSON.stringify(requests)) {
  //     setUpdatedRequest(requests);
  //     Toast('Заявки обновлены', {
  //       type: 'success',
  //     });
  //   }
  // }, [requests]);

  useEffect(() => {
    document.body.style.overflow = notificationShown ? 'hidden' : 'unset';
  }, [notificationShown]);

  useEffect(() => {
    dispatch(fetchRequests(requests));
    if (services.length == 0) {
      dispatch(fetchServices());
    }
    // const currentTime = new Date().getTime();

    // if (!localStorage.getItem('request-time')) {
    //   dispatch(fetchRequests(requests));
    //   localStorage.setItem('request-time', String(currentTime));
    // }

    // const localStorageTime = localStorage.getItem('request-time');

    // if (currentTime - Number(localStorageTime) >= 10000) {
    //   dispatch(fetchRequests(requests));
    //   localStorage.setItem('request-time', String(currentTime));
    // }
  }, []);

  return (
    <div className={styles.RequestsWrapper}>
      <FeedbackModal />
      <NotificationModal
        {...currentRequest}
        notification={currentRequest.notification}
        smileIcon={currentRequest.smileIcon}
        serviceName={currentRequest.serviceName}
        number={currentRequest.number}
        date={currentRequest.createdAt}
        requestId={currentRequest.id}
        shown={notificationShown}
        onHide={() => setNotificationShown(false)}
      />
      {isLoading ? (
        <>
          <Skeleton rows={2} withLogo />
          <Skeleton rows={2} withTitle />
          <Skeleton rows={2} withTitle />
        </>
      ) : requests.length === 0 ? (
        <p> Вы пока не оставляли заявок или их не удалось загрузить </p>
      ) : (
        <>
          {profileCard}
          <div className={cx(styles.RequestsFilter, 'OnboardingStep1')}>
            <div>
              {requestFilters.map((filter) => (
                <span
                  key={filter.title}
                  className={cx(styles.RequestsFilterItem, {
                    [styles.Active]: filter === activeFilter,
                  })}
                  onClick={() => handleChangeFilter(filter)}
                >
                  {filter.title}
                </span>
              ))}
            </div>
            <div>
              {/* {filterRequests(requests).length > 1 && */}
              {requests.length > 1 && activeFilter === requestFilters[3] && (
                <Button
                  className={styles.RequestsDeleteAll}
                  onClick={() => {
                    setDisabledDeleteAll(true);
                    dispatch(removeAllDraft());
                  }}
                  disabled={disabledDeleteAll}
                >
                  Удалить все черновики
                </Button>
              )}
            </div>
          </div>
          <Card>
            {/* {filterRequests(requests).length > 0 ? ( */}
            {requests.length > 0 ? (
              activeFilter !== requestFilters[3] ? (
                <div className={styles.RequestsHeader}>
                  <div>Наименование, номер и дата заявки</div>
                  <div>Текущий статус</div>
                </div>
              ) : (
                <>
                  <div className={styles.RequestsHeader}>
                    <div>Наименование, номер и дата заявки</div>
                    <div>Текущий статус</div>
                  </div>
                </>
              )
            ) : (
              <Card
                title="Вы еще не оставляли заявок"
                className={styles.RequestsPlaceholder}
              >
                <Button className={styles.RequestsPlaceholderButton}>
                  <Breadcrumbs
                    textColor="white"
                    breadcrumbList={[
                      {
                        title: 'Назад в Бизнесмаркет',
                        path: 'https://moscow.business/business-market/',
                      },
                    ]}
                  />
                </Button>
              </Card>
            )}
            <TransitionGroup>
              {/* {filterRequests(requests) */}
              {requests
                .slice(0, shownRequests)
                .map(
                  ({
                    id,
                    serviceName,
                    number,
                    createdAt,
                    statusName,
                    smileIcon,
                    notification,
                    stages,
                    serviceId,
                  }: Request) => (
                    <CSSTransition
                      key={id + number}
                      timeout={500}
                      classNames="requestAnimation"
                    >
                      <div
                        className={
                          activeFilter !== requestFilters[3]
                            ? styles.RequestsItem
                            : styles.RequestsItemTopPart
                        }
                        onClick={() => {
                          if (activeFilter === requestFilters[3]) {
                            window.location.href = `${window.location.origin}${RoutePaths.REQUESTS}/add?draft=${serviceId}`;
                          } else {
                            navigate(`${RoutePaths.REQUESTS}/${number}`);
                          }
                        }}
                      >
                        {activeFilter === requestFilters[3] && (
                          <div className={styles.RequestsItemTopPartDraft}>
                            <div className={styles.RequestsItemTopPartInfo}>
                              <span>Черновик</span>
                              {createdAt}
                            </div>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeDraft(id));
                              }}
                              className={styles.RequestsItemTopPartDraftButton}
                            >
                              <BinIcon />
                              <span
                                className={
                                  styles.RequestsItemTopPartDraftButtonTitle
                                }
                              >
                                Удалить черновик
                              </span>
                            </div>
                          </div>
                        )}

                        <div className={styles.RequestsItemWrapper}>
                          <div className={styles.RequestsItemMain}>
                            <div className={styles.RequestsItemIcon}>
                              {smileIcon}
                            </div>
                            <div>
                              {activeFilter !== requestFilters[3] ? (
                                <>
                                  <div className={styles.RequestsItemName}>
                                    {serviceName}
                                  </div>
                                  <div className={styles.RequestsItemDate}>
                                    №{number} от {createdAt}
                                  </div>
                                </>
                              ) : (
                                <div className={styles.RequestsWrapper}>
                                  <div className={styles.RequestsItemNameDraft}>
                                    {serviceName}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            className={
                              styles[
                                `RequestsItemStatus${
                                  notification
                                    ? 'WithNotification'
                                    : // : getStatusColor(statusName) todo раскоментить
                                      'ServiceProvided'
                                }`
                              ]
                            }
                          >
                            {/* {requestsStatusesInfo[statusName].title} */}
                            {statusName}
                            {notification && (
                              <div
                                className={styles.RequestsItemNotification}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationShown({
                                    id,
                                    serviceName,
                                    number,
                                    createdAt,
                                    statusName,
                                    smileIcon,
                                    notification,
                                    stages,
                                    serviceId,
                                  });
                                }}
                              >
                                <NotificationIcon
                                  className={styles.ItemNotificationIcon}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  )
                )}
            </TransitionGroup>
            {/* {filterRequests(requests).length > shownRequests && ( */}
            {requests.length > shownRequests && (
              <div className={styles.RequestsShowMoreWrapper}>
                <span className={styles.RequestsShowMore} onClick={showMore}>
                  Загрузить ещё
                </span>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default Requests;
