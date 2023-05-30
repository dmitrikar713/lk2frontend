import React, { FC } from 'react';

import styles from './PageStatus.module.scss';
import { StatusCode } from 'src/api/StatusCode';
import { Button, ButtonSize } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { NotFoundIcon } from './StatusIcons/404';

export interface PageStatusProps {
  status: StatusCode;
  homeButton?: boolean;
}

export const PageStatus: FC<PageStatusProps> = ({
  status,
  homeButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.PageStatus}>
      {status === StatusCode.NotFound && (
        <>
          <NotFoundIcon />
          <h1 className={styles.PageStatusTitle}>Страница не найдена</h1>
        </>
      )}
      {status === StatusCode.ResetContent && (
        <>
          <h1 className={styles.PageStatusTitle}>Выход успешно завершен</h1>
        </>
      )}
      {homeButton && (
        <Button
          size={ButtonSize.ExtraLarge}
          onClick={() => navigate('/')}
          className={styles.PageStatusHomeButton}
        >
          На главную
        </Button>
      )}
    </div>
  );
};
