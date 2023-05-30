import React, { FC } from 'react';
import cx from 'classnames';

import styles from './Request.module.scss';
import { Status, StatusSize, StatusType } from '../../Status/Status';

export enum RequestSize {
  Large = 'Large',
  Normal = 'Normal',
}

export interface RequestProps {
  size?: RequestSize;
  date: string;
  title: string;
  number: string;
  logo: JSX.Element;
  statusType: StatusType;
  statusText: string;
}

export const Request: FC<RequestProps> = ({
  size = RequestSize.Normal,
  date,
  title,
  number,
  logo,
  statusType,
  statusText,
}) => (
  <div className={cx(styles.Request, styles[size])}>
    <div className={styles.RequestHeader}>{date}</div>
    <div className={styles.RequestBody}>
      <div className={styles.RequestBodyLogo}>{logo}</div>
      <div className={styles.RequestBodyInfo}>
        <div className={styles.RequestTitle}>{title}</div>
        <div className={styles.RequestNumber}>№ {number}</div>
      </div>
    </div>
    <div className={styles.RequestStatus}>
      <Status
        size={StatusSize[size]}
        type={statusType}
        text={statusText}
        filled
      />
    </div>
  </div>
);
