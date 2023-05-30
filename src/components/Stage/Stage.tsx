import React, { FC, useRef, useState } from 'react';
import cx from 'classnames';

import styles from './Stage.module.scss';
import { RequestStatus } from 'src/entities/Statuses';
import { RequestStages } from 'src/entities/Subjects';
import { Substage } from '../Substage/Substage';
import { UploadedDocuments } from 'src/pages/Requests/Request/RequestSlice';

interface StageProps {
  stage: RequestStages;
  docs: UploadedDocuments;
}

enum TransitionType {
  Open = 'Open',
  Close = 'Close',
}

export const Stage: FC<StageProps> = ({ stage, docs }) => {
  const substageBody = useRef<HTMLDivElement>(null);
  const [substageCollapsed, setSubstageCollapsed] = useState<boolean>(
    stage.status === RequestStatus.inWork ? true : false
  );
  const [transitionType, setTransitionType] = useState<TransitionType | null>(
    null
  );

  const handleSubstageCollapse = () => {
    const substageBodyRef = substageBody.current;

    if (substageBodyRef) {
      const maxHeight = substageBodyRef.scrollHeight;
      substageBodyRef.style.maxHeight = maxHeight + 1000 + 'px';
    }

    setTimeout(() => {
      setTransitionType(
        substageCollapsed ? TransitionType.Open : TransitionType.Close
      );
      setSubstageCollapsed(!substageCollapsed);
    }, 0);
  };

  return (
    <div
      ref={substageBody}
      className={cx(
        !substageCollapsed && styles.StageStatusWrapper,
        transitionType && styles[transitionType]
      )}
    >
      <div
        className={
          stage.status === RequestStatus.inWork
            ? styles.StageStatusProcessing
            : stage.status === RequestStatus.Pending
            ? styles.StageStatusPending
            : styles.StageStatusCompleted
        }
      >
        <div
          className={styles.StageWrapperSubstageHeader}
          onClick={handleSubstageCollapse}
        >
          <span
            className={
              stage.status === RequestStatus.inWork
                ? styles.StageStatusNumberProcessing
                : styles.StageStatusNumber
            }
          >
            {stage.stageOrder}
          </span>
          <span
            className={
              stage.status === RequestStatus.inWork
                ? styles.StageStatusNavBarProcessing
                : ''
            }
          >
            {stage.title}
          </span>
        </div>
        <span className={styles.StageStatusDate}>
          {stage.dateCreated}
          {stage.dateClosed && `-${stage.dateClosed}`}
        </span>
      </div>
      {substageCollapsed &&
        stage.substages.map((substage) => (
          <Substage
            status={stage.status}
            key={substage.title}
            substage={substage}
            docs={docs}
          />
        ))}
    </div>
  );
};
