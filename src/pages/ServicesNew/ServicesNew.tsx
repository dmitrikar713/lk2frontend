import React, { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchServices } from 'src/store/thunks/services/FetchServices';

import styles from './ServicesNew.module.scss';

export interface ServicesProps {
  profileCard: ReactNode;
}

const ServicesNew: FC<ServicesProps> = ({ profileCard }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const services : any = useAppSelector((state) => state.servicesReducer.services);
  const services : any = [
    {
      id: 13132123,
      name: 'На оборудование для резидентов технопарка и кластера',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 13134123,
      name: 'На оборудование для резидентов технопарка и кластера2',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 13131253,
      name: 'На оборудование для резидентов технопарка и кластера3',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 13132123,
      name: 'На оборудование для резидентов технопарка и кластера',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 13134123,
      name: 'На оборудование для резидентов технопарка и кластера2',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 131231253,
      name: 'На оборудование для резидентов технопарка и кластера3',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 13133542123,
      name: 'На оборудование для резидентов технопарка и кластера',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 1313475123,
      name: 'На оборудование для резидентов технопарка и кластера2',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
    {
      id: 131131253,
      name: 'На оборудование для резидентов технопарка и кластера3',
      imgUrl: 'https://img.pixers.pics/pho_wat(s3:700/FO/41/39/64/48/700_FO41396448_18d4496bd8d0b325204b5d083b1b8c5f.jpg,697,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,477,650,jpg)/posters-red-flower-on-white-background.jpg.jpg'
    },
  ];

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <div className={styles.ServicesWrapper}>
      {profileCard}
      <div className={styles.Services}>
        <div className={styles.ServicesTitle}>Вам доступны услуги</div>
        <div className={styles.ServicesRow}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={styles.ServicesItem}
              onClick={() => navigate(`/services/${service.id}`)}
            >
                <p className={styles.item__order}>{index}.</p>
                <h3 className={styles.item__name}> {service.name}</h3>
                <img src={service.imgUrl} alt="" className={styles.item__img}/>
            </div>
          ))}

            <div
              className={styles.ServicesItem}
            //   onClick={() => navigate(`/services/${service.id}`)}
            >
                <div className={styles.titles}>
                    <h4>Реальные истории из первых уст.</h4>
                    <p>Кейсы получателей субсидий →</p>
                </div>
                <div  className={styles.hashtags}>
                    <p>#слово_компаниям</p>
                    <p>#субсидии</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesNew;
