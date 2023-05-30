import React, { FC } from 'react';
import { ForwardLink } from 'src/components/ForwardLink/ForwardLink';
import { RoutePaths } from 'src/entities/Routes';
import styles from './Notification.module.scss';
import { fetchFeedback } from 'src/store/thunks/feedback/FetchFeedback';
import { useAppDispatch } from 'src/hooks/redux';
import { FeedbackModal } from 'src/pages/Requests/Request/new/modals/Feedback/FeedbackModal';

interface NotificationProps {
  headerTitles: { info: string; status: string };
  notification: string;
  number: string;
  serviceName: string;
  date: string;
  smileIcon: string;
  requestId: string;
}

export const Notification: FC<NotificationProps> = ({
  headerTitles,
  notification,
  number,
  serviceName,
  date,
  smileIcon,
  requestId,
}) => {
  const dispatch = useAppDispatch();
  const handleClickNotification = async () => {
    if (notification === FeedbackName.feedback) {
      dispatch(fetchFeedback());
    }
  };
  enum FeedbackName {
    feedback = 'Обратная связь',
  }
  return (
    <>
      <FeedbackModal />
      <div className={styles.NotificationWrapper}>
        <div className={styles.NotificationHeader}>{headerTitles.info}</div>
        <div className={styles.NotificationMain}>
          <div>
            <div className={styles.NotificationName}>
              <span className={styles.NotificationIcon}>{smileIcon}</span>
              {serviceName}
            </div>
            <div className={styles.NotificationDate}>
              №{number} от {date}
            </div>
          </div>
        </div>
        <div className={styles.NotificationHeader}>{headerTitles.status}</div>
        <div
          className={styles.NotificationStatus}
          onClick={() => handleClickNotification()}
        >
          {notification}
        </div>
      </div>
      <div
        className={styles.NotificationForwardLink}
        onClick={() => {
          document.getElementsByTagName('body')[0].style.overflow = 'visible';
        }}
      >
        <ForwardLink
          title="Подробнее"
          path={RoutePaths.REQUESTS + '/' + number}
        />
      </div>
    </>
  );
};
