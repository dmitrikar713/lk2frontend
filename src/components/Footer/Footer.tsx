import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Footer.module.scss';
import { SocialMedia, SocialMediaType } from '../SocialMedia/SocialMedia';
import { MoscowDepartmentIcon } from 'src/styles/icons/moscowDepartment';

export interface FooterProps {
  isMobile?: boolean;
}

const socialMedias = [
  SocialMediaType.VK,
  // SocialMediaType.Instagram,
  // SocialMediaType.Facebook,
  SocialMediaType.Telegram,
  SocialMediaType.YouTube,
];

export const Footer: FC<FooterProps> = ({ isMobile = false }) => (
  <div className={styles.FooterWrapper}>
    <div
      className={cx(styles.Footer, {
        [styles.Mobile]: isMobile,
      })}
    >
      <MoscowDepartmentIcon />
      <div className={styles.FooterSocial}>
        {socialMedias.map((media: SocialMediaType) => (
          <SocialMedia key={media} type={media} />
        ))}
      </div>
    </div>
  </div>
);
