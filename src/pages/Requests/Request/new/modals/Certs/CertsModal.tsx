import React, { FC, useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { Modal } from 'src/components/Modal/Modal';
import cx from 'classnames';

import styles from './CertsModal.module.scss';

interface CertsModalProps {
  shown: boolean;
  onHide: () => void;
  certs: Array<any>;
  onCertSelect: (cert: any) => void;
}

export const CertsModal: FC<CertsModalProps> = ({
  shown,
  onHide,
  certs,
  onCertSelect,
}) => {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  return (
    <Modal
      isShown={shown}
      title="Сертификаты для подписи"
      onHide={onHide}
      className={styles.CertsModal}
    >
      <div className={styles.Certs}>
        {certs.map((cert, index) => (
          <div
            key={cert.info + index.toString()}
            className={cx(styles.CertsItem, {
              [styles.CertsItemActive]: selectedCert === cert,
            })}
            onClick={() => setSelectedCert(cert)}
          >
            <div className={styles.CertsItemInfo}>
              <span className={styles.CertsItemInfoIssuer}>
                {cert.info.issuer.CN}
              </span>
              <span className={styles.CertsItemInfoSubject}>
                {cert.info.subject.CN}
              </span>
              <span>
                Истекает:{' '}
                {new Date(cert.info.not_after).toLocaleDateString('ru')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className={styles.CertsSelectButton}
        onClick={() => onCertSelect(selectedCert)}
        disabled={!selectedCert}
      >
        Выбрать
      </Button>
    </Modal>
  );
};
