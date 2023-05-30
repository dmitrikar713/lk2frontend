import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/Avatar/Avatar';
import { FileUploader } from 'src/components/FileUploader/FileUploader';
import { ForwardLink } from 'src/components/ForwardLink/ForwardLink';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ChevronDownIcon } from 'src/styles/icons/chevronDown';
import { ChevronUpIcon } from 'src/styles/icons/chevronUp';
import { NotificationIcon } from 'src/styles/icons/notification';
import { SettingsIcon } from 'src/styles/icons/settings';
import cx from 'classnames';

import styles from './ProfileInfo.module.scss';
import { PieChart } from 'src/components/PieChart/PieChart';
import { updateProfileLogo } from 'src/store/thunks/profile/UpdateProfileLogo';

export enum ProfileSegments {
  Settings = 'settings',
  Notifications = 'notifications',
  Exports = 'exports',
}
interface ProfileInfoProps {
  segmentsIncluded?: Array<ProfileSegments>;
  withLogoUploading?: boolean;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  withLogoUploading,
  segmentsIncluded = [],
}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notificationsReducer.notifications
  );
  const { user, organization, logo } = useAppSelector(
    (state) => state.profileReducer.profile
  );
  const { profile } = useAppSelector((state) => state.profileReducer);

  const [profileWrapped, setProfileWrapped] = useState<boolean>(false);

  const handleUploadLogo = async (fList: FileList) => {
    dispatch(updateProfileLogo(fList, profile));
  };

  return (
    <div className={cx(styles.ProfileWrapper, 'OnboardingStep2')}>
      <div className={styles.ProfileBody}>
        <div className={styles.ProfileAvatar}>
          <div className={styles.ProfileAvatarWrapper}>
            <div className={styles.ProfileAvatarContainer}>
              {!profileWrapped && (
                <FileUploader
                  disabled={!withLogoUploading}
                  onUpload={handleUploadLogo}
                  customRender={
                    <Avatar
                      src={logo}
                      placeholderLabel={
                        withLogoUploading ? 'Загрузить\nфото' : 'LOGO'
                      }
                      disabled={!withLogoUploading}
                    />
                  }
                />
              )}
            </div>
            <div className={styles.ProfileAvatarName}>
              {organization.org_type === 'company'
                ? organization.org_name_short
                : `${user.user_last_name} ${user.user_first_name} ${user.user_middle_name}`}
            </div>
          </div>
        </div>
        {segmentsIncluded.includes(ProfileSegments.Exports) && !profileWrapped && (
          <div className={styles.ProfileChart}>
            <div className={styles.ProfileChartWrapper}>
              <PieChart
                size={100}
                lineWidth={25}
                colors={['#ff4361', '#c4c4c4']}
                data={[75, 25]}
              />
              <div className={styles.ProfileChartLegend}>
                {`Результаты теста
          экспортной
          готовности`}
              </div>
            </div>
            <ForwardLink title="Тест экспортной готовности" path="/exports" />
          </div>
        )}
      </div>
      {
        <div className={styles.ProfileIcons}>
          {segmentsIncluded.includes(ProfileSegments.Settings) && (
            <span className={styles.ProfileIconsSettings}>
              <SettingsIcon />
            </span>
          )}
          {segmentsIncluded.includes(ProfileSegments.Notifications) &&
            notifications.length > 0 && (
              <div
                className={styles.ProfileIconsNotifications}
                onClick={() => navigate('/notifications')}
              >
                <NotificationIcon className={styles.ItemNotificationIcon} />
                <div className={styles.ProfileIconsCounter}>
                  {notifications.length}
                </div>
              </div>
            )}
        </div>
      }
      <div
        onClick={() => setProfileWrapped(!profileWrapped)}
        className={styles.ProfileWrapIcon}
      >
        {profileWrapped ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </div>
    </div>
  );
};
