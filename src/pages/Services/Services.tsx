import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchServices } from 'src/store/thunks/services/FetchServices';
import styles from './Services.module.scss';

const Services: FC = () => {
  const services = useAppSelector((state) => state.servicesReducer.services);
  const dispatch = useAppDispatch();
  const availableServices =
    services.length > 0
      ? services.filter((s) => s.OtobrazhatVLkWeb === 'Да')
      : [];

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <div className={styles.Services}>
      {availableServices.length > 0
        ? availableServices.map((item, index) => (
            <ServiceItem
              key={index}
              serviceName={item.NAME}
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
  isrppGuid: string;
}
const ServiceItem = (props: SIProps) => {
  const navigate = useNavigate();
  function nav() {
    console.log('nav');
    navigate(String(props.isrppGuid));
  }
  return (
    <div
      key={props.index}
      className={styles.ServicesItem}
      onClick={
        nav
        //  "guid": "094d5ad7669c41e19a03b103684cff74",
        // "name": "Продвижение в сфере международной электронной торговли"

        //  "guid": "bb198aa6c22340679afff9ee5b67deef",
        // "name": "Ритейл сети"
      }
    >
      <h3 className={styles.ServicesItemNumber}>{props.index}.</h3>
      <p>{props.serviceName}</p>
      <div className={styles.ServicesItemImg}>
        <img src={props.img} alt="" className={styles.ServicesItemImg} />
      </div>
    </div>
  );
};

export default Services;
