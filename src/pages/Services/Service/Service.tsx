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
  const service = services.find((serv) => serv.IDUslugiIsRpp == serviceId);
  // const service = services.find((serv) => serv.ID === '1460');
  // console.log(service);

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
  //       service.KakiyeZatratyKompensiruMassiv.KakiyeZatratyKompensiruyutsya;
  //     ('123');
  //     console.log('tried setting innerhtml2');
  //   }
  // }, [PeriodKompensatsiiRef, KakiyeZatratyKompensiruyutsyaRef]);

  return service ? (
    <div className={styles.Service}>
      <div className={styles.Hero}>
        <div className={styles.HeroText}>
          {service.KratkoyeOpisaniyeUslugiMassiv
            .KratkoyeOpisaniyeUslugiZagolovok && (
            <h2>
              {
                service.KratkoyeOpisaniyeUslugiMassiv
                  .KratkoyeOpisaniyeUslugiZagolovok
              }
            </h2>
          )}
          {service.KratkoyeOpisaniyeUslugiMassiv.KratkoyeOpisaniyeUslugi && (
            <p>
              {parse(
                service.KratkoyeOpisaniyeUslugiMassiv.KratkoyeOpisaniyeUslugi
              )}
            </p>
          )}
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
          {service.UrlProductPicture && (
            <img
              //  src="https:soft-id.ru/upload/iblock/8c4/8c4baf05a96c5ad4b0d251b08f4e2940.png"
              src={service.UrlProductPicture}
              alt=""
            />
          )}
        </div>
      </div>

      <div className={styles.Whocanget}>
        {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitZagolovok && (
          <h5 className={styles.WhocangetTitle}>
            {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitZagolovok}
          </h5>
        )}
        {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitPodZagolovok && (
          <p className={styles.WhocangetSubtitle}>
            {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitPodZagolovok}
          </p>
        )}
        {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchit && (
          <p className={styles.WhocangetText}>
            {parse(service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchit)}
          </p>
        )}
      </div>

      {service.KakiyeZatratyKompensiruMassiv && (
        <div className={styles.Whatiscompensated}>
          {service.KakiyeZatratyKompensiruMassiv
            .KakiyeZatratyKompensiruyutsyaZagolovok && (
            <h5 className={styles.WhatiscompensatedTitle}>
              {
                service.KakiyeZatratyKompensiruMassiv
                  .KakiyeZatratyKompensiruyutsyaZagolovok
              }
            </h5>
          )}
          <div className={styles.WhatiscompensatedContent}>
            <div className={styles.WhatiscompensatedContentLeft}>
              {service.KakiyeZatratyKompensiruMassiv
                .KakiyeZatratyKompensiruyutsyaPodzagolovok && (
                <p className={styles.WhatiscompensatedSubtitle}>
                  {
                    service.KakiyeZatratyKompensiruMassiv
                      .KakiyeZatratyKompensiruyutsyaPodzagolovok
                  }
                </p>
              )}
              {service.KakiyeZatratyKompensiruMassiv
                .KakiyeZatratyKompensiruyutsya && (
                <p
                  className={styles.WhatiscompensatedText}
                  ref={KakiyeZatratyKompensiruyutsyaRef}
                >
                  {parse(
                    service.KakiyeZatratyKompensiruMassiv
                      .KakiyeZatratyKompensiruyutsya
                  )}
                </p>
              )}
            </div>
            <MoneybagIcon />
          </div>
        </div>
      )}

      {service.RezultatMassiv && (
        <div className={styles.Result}>
          {service.RezultatMassiv.RezultatZagolovok && (
            <h5 className={styles.ResultTitle}>
              {service.RezultatMassiv.RezultatZagolovok}
            </h5>
          )}
          {service.RezultatMassiv.RezultatPodzagolovok && (
            <p className={styles.ResultSubtitle}>
              {service.RezultatMassiv.RezultatPodzagolovok}
            </p>
          )}
          {service.RezultatMassiv.Rezultats && (
            <p className={styles.ResultText}>
              {parse(service.RezultatMassiv.Rezultats)}
              {/* {service.RezultatMassiv.Rezultats} */}
            </p>
          )}
        </div>
      )}

      {service.RazmerKompensatsiiMassiv && (
        <div className={styles.Compensationsize}>
          {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok && (
            <h5 className={styles.CompensationsizeTitle}>
              {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok}
            </h5>
          )}
          <div className={styles.CompensationsizeContent}>
            <div className={styles.CompensationsizeContentLeft}>
              {service.RazmerKompensatsiiMassiv
                .RazmerKompensatsiiPodzagolovok && (
                <p className={styles.CompensationsizeSubtitle}>
                  {
                    service.RazmerKompensatsiiMassiv
                      .RazmerKompensatsiiPodzagolovok
                  }
                </p>
              )}

              {service.RazmerKompensatsiiMassiv.RazmerKompensatsii && (
                <p className={styles.CompensationsizeText}>
                  {parse(service.RazmerKompensatsiiMassiv.RazmerKompensatsii)}
                </p>
              )}
            </div>
            <RoubleIcon />
          </div>
        </div>
      )}

      {service.PeriodKompensatsiiMassiv && (
        <div className={styles.Compensationperiod}>
          {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok && (
            <h5 className={styles.CompensationperiodTitle}>
              {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok}
            </h5>
          )}
          <div className={styles.CompensationperiodContent}>
            <div className={styles.CompensationperiodContentLeft}>
              {service.PeriodKompensatsiiMassiv.PeriodKompensatsii && (
                <p className={styles.CompensationperiodSubtitle}>
                  {parse(service.PeriodKompensatsiiMassiv.PeriodKompensatsii)}
                </p>
              )}
            </div>
            <TimeIcon />
          </div>
        </div>
      )}

      {service.Documenty && service.Documenty.length && (
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
  ) : (
    <>{serviceId}</>
  );
};

export default Service;
