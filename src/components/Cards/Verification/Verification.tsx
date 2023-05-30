import React, { FC } from 'react';

import styles from './Verification.module.scss';
import { Status, StatusSize, StatusType } from '../../Status/Status';

export interface VerificationProps {
  date: string;
  documentName: string;
  statusType: StatusType;
  statusText: string;
  decsription: string;
}

export const Verification: FC<VerificationProps> = ({
  date,
  documentName,
  statusType,
  statusText,
  decsription,
}) => (
  <div className={styles.Verification}>
    <div className={styles.VerificationHeader}>
      <div className={styles.VerificationDocument}>
        <div className={styles.VerificationHeaderIcon} />
        <span>{documentName}</span>
      </div>
      <span className={styles.VerificationHeaderMore} />
    </div>
    <div className={styles.VerificationStatus}>
      <Status size={StatusSize.Normal} type={statusType} text={statusText} />
    </div>
    <div className={styles.VerificationBody}>{decsription}</div>
    <div className={styles.VerificationDate}>{date}</div>
  </div>
);
