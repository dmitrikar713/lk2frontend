import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'src/entities/Routes';
import { ExitIcon } from 'src/styles/icons/exit';
import { UserIcon } from 'src/styles/icons/user';
import { RequestsIcon } from 'src/styles/icons/requests';
import { exit } from 'src/common/utils/exit';
import { Modal } from '../Modal/Modal';
import { Button, ButtonType } from '../Button/Button';

import styles from './FooterMobile.module.scss';
import { Auth } from 'src/api/auth';

export const FooterMobile: FC = () => {
  const [isModalShown, setModalShown] = useState<boolean>(false);

  return (
    <div className={styles.FooterMobile}>
      <div className={styles.FooterMobileIcons}>
        {Auth.token ? (
          <>
            {' '}
            <Link to={RoutePaths.REQUESTS}>
              <div className={styles.FooterMobileIconsItem}>
                <RequestsIcon />
                <span>Заявки</span>
              </div>
            </Link>
            <Link to={RoutePaths.PROFILE}>
              <div className={styles.FooterMobileIconsItem}>
                <UserIcon />
                <span>Профиль компании</span>
              </div>
            </Link>
            <div
              className={styles.FooterMobileIconsItem}
              onClick={() => setModalShown(true)}
            >
              <ExitIcon />
              <span>Выход</span>
            </div>
          </>
        ) : (
          <>
            <Link to={RoutePaths.SERVICES}>
              <div className={styles.FooterMobileIconsItem}>
                <RequestsIcon />
                <span>Список услуг</span>
              </div>
            </Link>
            <div
              className={styles.FooterMobileIconsItem}
              onClick={() => {
                window.location.pathname = '/api/login';
              }}
            >
              <ExitIcon />
              <span>Войти</span>
            </div>
          </>
        )}
      </div>
      <Modal
        className={styles.FooterMobileModalLogout}
        title="Вы точно хотите выйти из личного кабинета?"
        isShown={isModalShown}
        onHide={() => setModalShown(false)}
      >
        <div className={styles.FooterMobileModalLogoutSelect}>
          <Button onClick={() => exit()} type={ButtonType.Secondary}>
            Да
          </Button>
          <Button onClick={() => setModalShown(false)}>Нет</Button>
        </div>
      </Modal>
    </div>
  );
};
