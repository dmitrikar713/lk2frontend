import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchServices } from 'src/store/thunks/services/FetchServices';
import styles from './Services.module.scss';

const Services: FC = () => {
  const services = useAppSelector((state) => state.servicesReducer.services);
  const dispatch = useAppDispatch();
  const availableServices = services.filter((s) => s.OtobrazhatVLkWeb === 'Да');

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

  return (
    <div
      key={props.index}
      className={styles.ServicesItem}
      onClick={() => navigate(props.isrppGuid)}
    >
      <h3 className={styles.ServicesItemNumber}>{props.index}.</h3>
      <p className="service_item_name">{props.serviceName}</p>
      <img src={props.img} alt="" className="service_item_img" />
    </div>
  );
};

export default Services;
