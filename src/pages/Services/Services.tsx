import React, { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchServices } from 'src/store/thunks/services/FetchServices';

import styles from './Services.module.scss';

export interface ServicesProps {
  profileCard: ReactNode;
}

const Services: FC<ServicesProps> = ({ profileCard }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const services : any = useAppSelector((state) => state.servicesReducer.services);
 

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <div className={styles.ServicesWrapper}>
      {profileCard}
      <div className={styles.Services}>
        <div className={styles.ServicesTitle}>Вам доступны услуги</div>
        <div className={styles.ServicesRow}>
          {services.map((service) => (
            <div
              key={service.id}
              className={styles.ServicesItem}
              onClick={() => navigate(`/services/${service.id}`)}
            >
              {service.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
