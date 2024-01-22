import React, { FC } from 'react';
import { NotificationIcon } from 'src/styles/icons/notification';
import { SettingsIcon } from 'src/styles/icons/settings';

import styles from './ProfileIcons.module.scss';

export interface ProfileIconsProps {
  barWithSettings?: boolean;
  notifications: number;
  onClick: () => void;
}

export const ProfileIcons: FC<ProfileIconsProps> = ({
  barWithSettings,
  notifications,
  onClick,
}) => {
  return (
    <div className={styles.ProfileIconsCommon}>
      {barWithSettings && (
        <span className={styles.ProfileIconsCommonSettings}>
          <SettingsIcon />
        </span>
      )}
      <div className={styles.ProfileIconsCommonNotifications} onClick={onClick}>
        <NotificationIcon className={styles.ItemNotificationIcon} />
        {notifications && (
          <div className={styles.ProfileIconsCommonCounter}>
            {notifications}
          </div>
        )}
      </div>
    </div>
  );
};
