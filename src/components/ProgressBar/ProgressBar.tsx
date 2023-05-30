import React, { FC } from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  currentStep: number;
  steps: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, steps }) => (
  <div className={styles.Progress}>
    {currentStep}/{steps}
    <div className={styles.ProgressBar}>
      <div
        className={styles.ProgressPercent}
        style={{
          width: `${Math.floor((currentStep / steps) * 100)}%`,
        }}
      />
    </div>
  </div>
);
