import React, { FC, useEffect, useState } from 'react';
import { checkMobileScreen } from 'src/common/utils/checkMobileScreen';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { downloadOffer } from 'src/store/thunks/offer/DownloadOffer';
import { Button } from '../Button/Button';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './ConfirmForm.module.scss';

interface ConfirmFormProps {
  textConfirm: string;
  onClick: () => void;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({ textConfirm, onClick }) => {
  const dispatch = useAppDispatch();
  const [isShown, setShown] = useState<boolean>(true);

  const { fileConfirm } = useAppSelector((state) => state.requestReducer);

  const blob = new Blob([fileConfirm], {
    type: 'application/pdf',
  });
  const downloadUrl = window.URL.createObjectURL(blob);

  useEffect(() => {
    setShown(true);
    dispatch(downloadOffer());
  }, []);

  useEffect(() => {
    if (fileConfirm.size !== 0) setShown(false);
  }, [fileConfirm]);

  return (
    <div>
      {checkMobileScreen() ? (
        <p>
          Для продолжения заполнения заявки необходимо перейти в полную версию
          Личного кабинета с персонального компьютера.
        </p>
      ) : (
        <div className={styles.ConfirmForm}>
          {isShown && <Skeleton rows={9} />}
          {!isShown && (
            <iframe
              title="Offerta"
              src={`${downloadUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className={styles.ConfirmFormDocument}
              onLoad={() => setShown(false)}
            />
          )}
        </div>
      )}
      <Button
        onClick={() => onClick()}
        className={styles.FormSubmit}
        disabled={checkMobileScreen()}
      >
        Далее
      </Button>
    </div>
  );
};
