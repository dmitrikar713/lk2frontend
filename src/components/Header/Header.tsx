import React, { FC, useState } from 'react';
import { SettingsIcon } from 'src/styles/icons/settings';
import { ProfileIcon } from 'src/styles/icons/profile';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from 'src/entities/Routes';
import { ShopIcon } from 'src/styles/icons/shop';
import { SearchOutlinedIcon } from 'src/styles/icons/searchOutlined';
import { NavItem } from './dropdowns/NavItem';
import { Button, ButtonType } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { DropdownList } from './dropdowns/DropdownList';
import { exit } from 'src/common/utils/exit';
import styles from './Header.module.scss';
import { HeaderLogo } from './header-logo';
import { useAppSelector } from 'src/hooks/redux';

export const Header: FC = () => {
  const navigate = useNavigate();
  const [isModalShown, setModalShown] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { correntToken } = useAppSelector((state) => state.callbackReducer);

  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.Header}>
        <span className={styles.TitleWrapper}>
          <HeaderLogo />
        </span>
        <div className={styles.HeaderRefs}>
          <span className={styles.HeaderLinks}>
            {/* <span className={styles.HeaderLinksItem}>медиа</span> */}

            {correntToken ? (
              <Link to={RoutePaths.REQUESTS}>
                <span
                  className={
                    window.location.pathname === RoutePaths.REQUESTS
                      ? styles.HeaderLinksItemActive
                      : styles.HeaderLinksItem
                  }
                >
                  Заявки
                </span>
              </Link>
            ) : (
              ''
            )}

            <Link to={RoutePaths.SERVICES}>
              <span
                className={
                  window.location.pathname === RoutePaths.SERVICES
                    ? styles.HeaderLinksItemActive
                    : styles.HeaderLinksItem
                }
              >
                Список услуг
              </span>
            </Link>
            {!correntToken ? (
              <span
                onClick={() => {
                  window.location.pathname = '/api/login';
                }}
                className={styles.HeaderLinksItem}
              >
                Войти
              </span>
            ) : (
              ''
            )}
          </span>
          {correntToken ? (
            <span className={styles.HeaderIcons}>
              {/* <NavItem
                className={styles.HeaderIconsItem}
                icon={<SearchOutlinedIcon />}
              /> */}
              {/* <NavItem className={styles.HeaderIconsItem} icon={<ShopIcon />} /> */}
              <NavItem
                className={styles.HeaderIconsItem}
                icon={<ProfileIcon />}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                isShown={isDropdownOpen}
              >
                <DropdownList
                  onHide={() => setDropdownOpen(!isDropdownOpen)}
                  isShown={isDropdownOpen}
                >
                  <span
                    className={styles.HeaderDropdownItem}
                    onClick={() => navigate(RoutePaths.PROFILE)}
                  >
                    Профиль
                  </span>
                  <span
                    className={styles.HeaderDropdownItem}
                    onClick={() => setModalShown(true)}
                  >
                    Выход
                  </span>
                </DropdownList>
              </NavItem>
            </span>
          ) : (
            ''
          )}
        </div>
        <span className={styles.HeaderIconsMobile}>
          <SettingsIcon />
        </span>
      </div>
      <Modal
        className={styles.HeaderModalLogout}
        title="Вы точно хотите выйти из личного кабинета?"
        isShown={isModalShown}
        onHide={() => setModalShown(false)}
      >
        <div className={styles.HeaderModalLogoutSelect}>
          <Button onClick={() => exit()} type={ButtonType.Secondary}>
            Да
          </Button>
          <Button onClick={() => setModalShown(false)}>Нет</Button>
        </div>
      </Modal>
    </div>
  );
};
