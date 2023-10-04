import styles from './Service.module.scss';
import React, { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonSize, ButtonType } from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { fetchService } from 'src/store/thunks/services/FetchService';
import { MoneybagIcon, RoubleIcon, TimeIcon } from './icons';
import { useLocation } from 'react-router';
const parse = require('html-react-parser');

const Service: FC = () => {
  const { serviceId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const available = true; // заменить на проверку доступности сервера
  const PeriodKompensatsiiRef = useRef(null);
  const KakiyeZatratyKompensiruyutsyaRef = useRef(null);

  const request = useAppSelector((state) => state.requestReducer.request);
  const services = useAppSelector((state) => state.servicesReducer.services);
  const service = services.find((serv) => serv.IDUslugiIsRpp === serviceId);
  console.log(service);

  const { name, infoList, stages } = useAppSelector(
    (state) => state.serviceReducer.service
  );

  const createRequest = () => {
    dispatch(requestSlice.actions.setServiceId(serviceId));
    navigate('/requests/add');
  };

  useEffect(() => {
    dispatch(fetchService(serviceId));

    if (request.serviceId && request.serviceId != serviceId) {
      dispatch(requestSlice.actions.setDefaultState());
    }
  }, []);

  // useEffect(() => {
  //   if (
  //     PeriodKompensatsiiRef.current &&
  //     KakiyeZatratyKompensiruyutsyaRef.current
  //   ) {
  //     console.log('tried setting innerhtml1');
  //     PeriodKompensatsiiRef.current.innerHTML =
  //       service.PeriodKompensatsiiMassiv.PeriodKompensatsii;
  //     KakiyeZatratyKompensiruyutsyaRef.current.innerHTML =
  //       // service.KakiyeZatratyKompensiruMassiv.KakiyeZatratyKompensiruyutsya;
  //       '123';
  //     console.log('tried setting innerhtml2');
  //   }
  // }, [PeriodKompensatsiiRef, KakiyeZatratyKompensiruyutsyaRef]);

  return (
    <div className={styles.Service}>
      <div className={styles.Hero}>
        <div className={styles.HeroText}>
          <h2>
            {
              service.KratkoyeOpisaniyeUslugiMassiv
                .KratkoyeOpisaniyeUslugiZagolovok
            }
          </h2>
          <p>
            {parse(
              service.KratkoyeOpisaniyeUslugiMassiv.KratkoyeOpisaniyeUslugi
            )}
          </p>
          <div className={styles.HeroButtons}>
            {available ? (
              <Button
                type={ButtonType.Primary}
                size={ButtonSize.Medium}
                onClick={createRequest}
              >
                Получить услугу
              </Button>
            ) : (
              <Button
                type={ButtonType.Secondary}
                size={ButtonSize.Medium}
                onClick={createRequest}
              >
                Предворительная подача
              </Button>
            )}
          </div>
        </div>
        <div className={styles.HeroImage}>
          <img
            // src="https://soft-id.ru/upload/iblock/8c4/8c4baf05a96c5ad4b0d251b08f4e2940.png"
            src={service.UrlProductPicture}
            alt=""
          />
        </div>
      </div>

      <div className={styles.Whocanget}>
        <h5 className={styles.WhocangetTitle}>
          {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitZagolovok}
        </h5>
        <p className={styles.WhocangetSubtitle}>
          {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitPodZagolovok}
        </p>
        <p className={styles.WhocangetText}>
          {parse(service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchit)}
        </p>
      </div>

      <div className={styles.Whatiscompensated}>
        <h5 className={styles.WhatiscompensatedTitle}>
          {
            service.KakiyeZatratyKompensiruMassiv
              .KakiyeZatratyKompensiruyutsyaZagolovok
          }
        </h5>
        <div className={styles.WhatiscompensatedContent}>
          <div className={styles.WhatiscompensatedContentLeft}>
            <p className={styles.WhatiscompensatedSubtitle}>
              {
                service.KakiyeZatratyKompensiruMassiv
                  .KakiyeZatratyKompensiruyutsyaPodzagolovok
              }
            </p>
            <p
              className={styles.WhatiscompensatedText}
              ref={KakiyeZatratyKompensiruyutsyaRef}
            >
              {parse(
                service.KakiyeZatratyKompensiruMassiv
                  .KakiyeZatratyKompensiruyutsya
              )}
            </p>
          </div>
          <MoneybagIcon />
        </div>
      </div>

      <div className={styles.Result}>
        <h5 className={styles.ResultTitle}>
          {service.RezultatMassiv.RezultatZagolovok}
        </h5>
        <p className={styles.ResultSubtitle}>
          {service.RezultatMassiv.RezultatPodzagolovok}
        </p>

        <p className={styles.ResultText}>
          {parse(service.RezultatMassiv.Rezultats)}
          {/* {service.RezultatMassiv.Rezultats} */}
        </p>
      </div>

      <div className={styles.Compensationsize}>
        <h5 className={styles.CompensationsizeTitle}>
          {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok}
        </h5>
        <div className={styles.CompensationsizeContent}>
          <div className={styles.CompensationsizeContentLeft}>
            <p className={styles.CompensationsizeSubtitle}>
              {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiPodzagolovok}
            </p>
            <p className={styles.CompensationsizeText}>
              {parse(service.RazmerKompensatsiiMassiv.RazmerKompensatsii)}
            </p>
          </div>
          <RoubleIcon />
        </div>
      </div>
      {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok &
      service.PeriodKompensatsiiMassiv.PeriodKompensatsii ? (
        <div className={styles.Compensationperiod}>
          <h5 className={styles.CompensationperiodTitle}>
            {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok}
          </h5>
          <div className={styles.CompensationperiodContent}>
            <div className={styles.CompensationperiodContentLeft}>
              <p
                className={styles.CompensationperiodSubtitle}
                ref={PeriodKompensatsiiRef}
              >
                {service.PeriodKompensatsiiMassiv.PeriodKompensatsii}
              </p>
            </div>
            <TimeIcon />
          </div>
        </div>
      ) : (
        ''
      )}

      {service.Documenty ? (
        <div className={styles.Documents}>
          <h5 className={styles.DocumentsTitle}>{service.DocumentType}</h5>
          <div className={styles.DocumentsList}>
            <div className={styles.DocumentsGroup}>
              {service.Documenty.map((doc, index) => (
                <a
                  href={doc.DocLink}
                  key={index + doc.DocName}
                  className={styles.DocumentsItem}
                >
                  {doc.DocName}
                </a>
              ))}
            </div>
            <div className={styles.DocumentsGroup}></div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className={styles.Actions}>
        {available ? (
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={createRequest}
          >
            Получить услугу
          </Button>
        ) : (
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Medium}
            onClick={createRequest}
          >
            Предворительная подача
          </Button>
        )}
      </div>
    </div>
  );
};

export default Service;
