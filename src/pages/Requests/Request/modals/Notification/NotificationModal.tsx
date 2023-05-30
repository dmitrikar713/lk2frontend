import React, { FC } from 'react';
import { Modal } from 'src/components/Modal/Modal';
import { Notification } from 'src/pages/Notifications/components/Notification';
import styles from './NotificationModal.module.scss';

interface NotificationModalProps {
  notification: string;
  number: string;
  serviceName: string;
  date: string;
  smileIcon: string;
  requestId: string;
  shown: boolean;
  onHide: () => void;
}

const headerTitles = {
  info: 'Наименование, номер и дата заявки',
  status: 'Статус',
};

export const NotificationModal: FC<NotificationModalProps> = ({
  number,
  shown,
  onHide,
  ...rest
}) => (
  <Modal
    isShown={shown}
    title={`Уведомление
        по заявке №${number}`}
    onHide={onHide}
  >
    <div className={styles.NotificationModal}>
      <div className={styles.NotificationModalHeader}>
        <div className={styles.NotificationModalHeaderItem}>
          {headerTitles.info}
        </div>
        <div className={styles.NotificationModalHeaderItem}>
          {headerTitles.status}
        </div>
      </div>
      <Notification {...rest} number={number} headerTitles={headerTitles} />
    </div>
  </Modal>
);
