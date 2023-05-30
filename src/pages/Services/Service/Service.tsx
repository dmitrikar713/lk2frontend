import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { fetchService } from 'src/store/thunks/services/FetchService';

import styles from './Service.module.scss';

const Service: FC = () => {
  const { serviceId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const request = useAppSelector((state) => state.requestReducer.request);

  const { name, infoList, stages } = useAppSelector(
    (state) => state.serviceReducer.service
  );

  const createNewRequest = () => {
    if (serviceId) {
      dispatch(
        requestSlice.actions.setRequest({
          ...request,
          serviceId: serviceId,
          serviceName: name,
        })
      );

      navigate('/requests/add');
    }
  };

  useEffect(() => {
    dispatch(fetchService(serviceId));

    if (request.serviceId && request.serviceId != serviceId) {
      dispatch(requestSlice.actions.setDefaultState());
    }
  }, []);

  return (
    <div className={styles.Service}>
      <div className={styles.ServiceName}>{name}</div>
      <div className={styles.ServiceRow}>
        <ul className={styles.ServiceInfo}>
          {infoList.map((item, index) => (
            <li key={item} className={styles.ServiceInfoItem}>
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.ServiceStages}>
          <div className={styles.ServiceStepperHeader}>Основные этапы</div>
          <ol className={styles.ServiceStepper}>
            {stages.map((stage) => (
              <li key={stage.id} className={styles.ServiceStepperItem}>
                <div className={styles.ServiceStepperContent}>
                  <div className={styles.ServiceStepperTitle}>{stage.name}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Button className={styles.ServiceGetButton} onClick={createNewRequest}>
        Получить услугу
      </Button>
    </div>
  );
};

export default Service;
