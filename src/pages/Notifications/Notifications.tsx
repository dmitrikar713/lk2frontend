import React, { FC } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { useAppSelector } from 'src/hooks/redux';
import { Notification } from './components/Notification';

import styles from './Notifications.module.scss';
import { ClearIcon } from 'src/styles/icons/clear';
import { readNotifications } from 'src/store/thunks/notifications/ReadNotifications';
import { useDispatch } from 'react-redux';

const headerTitles = {
  info: 'Наименование, номер и дата заявки',
  status: 'Статус',
};

const Notifications: FC = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useAppSelector(
    (state) => state.notificationsReducer
  );
  return (
    <div className={styles.Notifications}>
      {isLoading ? (
        <>
          <Skeleton rows={3} withTitle />
        </>
      ) : (
        <>
          <div className={styles.NotificationsHeader}>
            <Breadcrumbs
              withArrowBack
              breadcrumbList={[{ title: 'Назад к заявкам', path: '/requests' }]}
            />
            {notifications.length > 0 && (
              <div
                className={styles.NotificationsClear}
                onClick={() => dispatch(readNotifications())}
              >
                <ClearIcon />
                <span className={styles.NotificationsClearLabel}>
                  Очистить уведомления
                </span>
              </div>
            )}
          </div>
          <div className={styles.NotificationsTitle}>
            {notifications.length > 0 ? 'Уведомления' : 'Новых уведомлений нет'}
          </div>
          {notifications.length > 0 && (
            <div className={styles.NotificationsHeader}>
              <div className={styles.NotificationsHeaderItem}>
                {headerTitles.info}
              </div>
              <div className={styles.NotificationsHeaderItem}>
                {headerTitles.status}
              </div>
            </div>
          )}
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.NotificationsWrapper}>
              <Notification
                {...notification}
                serviceName={notification.serviceName}
                headerTitles={headerTitles}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Notifications;
