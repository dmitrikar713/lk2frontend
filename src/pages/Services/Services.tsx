import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchServices } from 'src/store/thunks/services/FetchServices';
import styles from './Services.module.scss';
import axios from 'axios';
import { Modal } from 'src/components/Modal/Modal';
import { Button, ButtonSize, ButtonType } from 'src/components/Button/Button';
import { Auth } from 'src/api/auth';

const Services: FC = () => {
  const [authShown, setAuthShown] = useState(false);
  const services = useAppSelector((state) => state.servicesReducer.services);
  const { correntToken } = useAppSelector((state) => state.callbackReducer);
  const dispatch = useAppDispatch();
  const availableServices =
    services.length > 0
      ? services.filter((s) => s.OtobrazhatVLkWeb === 'Да')
      : [];

  useEffect(() => {
    dispatch(fetchServices());
    if (!Auth.token && !authShown) {
      setAuthShown(true);
    }
  }, []);

  return (
    <div className={styles.Services}>
      <Modal
        isShown={authShown}
        className={styles.Modal}
        title={`Добро пожаловать в личный кабинет АНО "МЭЦ"`}
        onHide={() => {
          setAuthShown(false);
        }}
      >
        <p>
          Авторизуйтесь в личном кабинете для доступа ко всем услугам.
          <br /> Внимание: без авторизации часть функционала недоступна.
        </p>
        <div className={styles.ModalButtons}>
          <Button
            size={ButtonSize.Medium}
            onClick={() => {
              window.location.pathname = '/api/login';
            }}
          >
            Авторизоваться в личном кабинете
          </Button>
          <Button
            size={ButtonSize.Medium}
            type={ButtonType.Secondary}
            onClick={() => setAuthShown(false)}
          >
            Продолжить без авторизации
          </Button>
        </div>
      </Modal>

      {availableServices.length > 0
        ? availableServices.map((item, index) => (
            <ServiceItem
              key={index}
              serviceName={item.KratkoeNazvanie}
              img={item.UrlProductPicture}
              index={index + 1}
              isrppGuid={item.IDUslugiIsRpp}
            />
          ))
        : ''}
      <div className={styles.ServicesLastItem}>
        <h3>Реальные истории из первых уст.</h3>
        <p>Кейсы получателей субсидий →</p>
        <div className={styles.ServicesLastItemHashtags}>
          <p>#слово_компаниям</p>
          <p>#субсидии</p>
        </div>
      </div>
    </div>
  );
};

interface SIProps {
  serviceName: string;
  img: string;
  index: number;
  isrppGuid: any;
}
const ServiceItem = ({ serviceName, img, index, isrppGuid }: SIProps) => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(false);
  function nav() {
    if (isrppGuid != null) {
      navigate(
        window.location.pathname == '/services'
          ? isrppGuid[0]
          : `/services/${isrppGuid[0]}`
      ); // если не авторизованы, то сервисы по базовому "/" показываются, добавляем /services
    }
  }
  const getImg = async () => {
    const imgg = await axios.get(img);

    setAvailable(imgg.status === 200 ? true : false);
  };
  useEffect(() => {
    getImg();
  }, []);

  return (
    <div
      key={index}
      className={
        window.innerWidth >= 1050
          ? styles.ServicesItem
          : styles.ServicesItemMobile
      }
      onClick={nav}
    >
      <h3 className={styles.ServicesItemNumber}>{index}.</h3>
      <p>{serviceName}</p>
      {/* {available && ( */}
      <div className={styles.ServicesItemImg}>
        <img
          src={img}
          alt="изображение услуги"
          className={styles.ServicesItemImg}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default Services;
