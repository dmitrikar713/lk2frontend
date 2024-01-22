import styles from './Service.module.scss';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonSize, ButtonType } from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { fetchService } from 'src/store/thunks/services/FetchService';
import { MoneybagIcon, RoubleIcon, TimeIcon } from './icons';
import { useLocation } from 'react-router';
import { fetchServices } from 'src/store/thunks/services/FetchServices';
import { Auth } from 'src/api/auth';
import { Modal } from 'src/components/Modal/Modal';
const parse = require('html-react-parser');

const Service: FC = () => {
  const { serviceId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const available = true; // заменить на проверку доступности сервера
  const KakiyeZatratyKompensiruyutsyaRef = useRef(null);
  const [authShown, setAuthShown] = useState(false);

  const request = useAppSelector((state) => state.requestReducer.request);
  const services = useAppSelector((state) => state.servicesReducer.services);
  const service = services.find((serv) => serv.IDUslugiIsRpp == serviceId);
  // const service = services.find((serv) => serv.ID === '1460');
  // console.log(service);

  const { name, infoList, stages } = useAppSelector(
    (state) => state.serviceReducer.service
  );

  const openServiceForm = () => {
    if (service.LinkNaFormuProducta) {
      window.open(service.LinkNaFormuProducta, '_blank', 'noreferrer');
    } else {
      if (Auth.token) {
        dispatch(requestSlice.actions.setServiceId(serviceId));
        navigate('/requests/add');
      } else {
        setAuthShown(true);
      }
    }
  };

  useEffect(() => {
    if (services.length === 0) dispatch(fetchServices());
    if (request.serviceId && request.serviceId != serviceId) {
      dispatch(requestSlice.actions.setDefaultState());
    }
  }, []);

  return service ? (
    <div className={styles.Service}>
      <div className={styles.Hero}>
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
        <div className={styles.HeroText}>
          {service.NAME && <h2>{service.NAME}</h2>}
          {service.KratkoyeOpisaniyeUslugiMassiv
            .KratkoyeOpisaniyeUslugiZagolovok && (
            <p style={styles.HeroTextSubtitle}>
              {
                service.KratkoyeOpisaniyeUslugiMassiv
                  .KratkoyeOpisaniyeUslugiZagolovok
              }
            </p>
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
                onClick={openServiceForm}
              >
                Получить услугу
              </Button>
            ) : (
              <Button
                type={ButtonType.Secondary}
                size={ButtonSize.Medium}
                onClick={openServiceForm}
              >
                Предворительная подача
              </Button>
            )}
          </div>
        </div>
        <div className={styles.HeroImage}>
          {service.UrlProductPicture && (
            <img src={service.UrlProductPicture} alt="" />
          )}
        </div>
      </div>

      {service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitZagolovok ||
      service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchitPodZagolovok ||
      service.KtoMozhetPoluchitMassiv.KtoMozhetPoluchit ? (
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
      ) : (
        ''
      )}

      {service.KakiyeZatratyKompensiruyutsyaMassiv
        .KakiyeZatratyKompensiruyutsyaZagolovok ||
      service.KakiyeZatratyKompensiruyutsyaMassiv
        .KakiyeZatratyKompensiruyutsyaPodzagolovok ||
      service.KakiyeZatratyKompensiruyutsyaMassiv
        .KakiyeZatratyKompensiruyutsya ? (
        <div className={styles.Whatiscompensated}>
          <div className={styles.WhatiscompensatedContent}>
            {service.KakiyeZatratyKompensiruyutsyaMassiv
              .KakiyeZatratyKompensiruyutsyaZagolovok && (
              <h5 className={styles.WhatiscompensatedTitle}>
                {
                  service.KakiyeZatratyKompensiruyutsyaMassiv
                    .KakiyeZatratyKompensiruyutsyaZagolovok
                }
              </h5>
            )}
            {service.KakiyeZatratyKompensiruyutsyaMassiv
              .KakiyeZatratyKompensiruyutsyaPodzagolovok && (
              <p className={styles.WhatiscompensatedSubtitle}>
                {
                  service.KakiyeZatratyKompensiruyutsyaMassiv
                    .KakiyeZatratyKompensiruyutsyaPodzagolovok
                }
              </p>
            )}
            {service.KakiyeZatratyKompensiruyutsyaMassiv
              .KakiyeZatratyKompensiruyutsya && (
              <p
                className={styles.WhatiscompensatedText}
                ref={KakiyeZatratyKompensiruyutsyaRef}
              >
                {parse(
                  service.KakiyeZatratyKompensiruyutsyaMassiv
                    .KakiyeZatratyKompensiruyutsya
                )}
              </p>
            )}
          </div>
          <MoneybagIcon />
        </div>
      ) : (
        ''
      )}

      {service.RezultatMassiv.RezultatZagolovok ||
      service.RezultatMassiv.Rezultats ||
      service.RezultatMassiv.RezultatPodzagolovok ? (
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
            </p>
          )}
        </div>
      ) : (
        ''
      )}

      {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok ||
      service.RazmerKompensatsiiMassiv.RazmerKompensatsiiPodzagolovok ||
      service.RazmerKompensatsiiMassiv.RazmerKompensatsii ? (
        <div className={styles.Compensationsize}>
          <div className={styles.CompensationsizeContent}>
            {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok && (
              <h5 className={styles.CompensationsizeTitle}>
                {service.RazmerKompensatsiiMassiv.RazmerKompensatsiiZagolovok}
              </h5>
            )}
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
      ) : (
        ''
      )}

      {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok ||
      service.PeriodKompensatsiiMassiv.PeriodKompensatsii ? (
        <div className={styles.Compensationperiod}>
          <div className={styles.CompensationperiodContent}>
            {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok && (
              <h5 className={styles.CompensationperiodTitle}>
                {service.PeriodKompensatsiiMassiv.PeriodKompensatsiiZagolovok}
              </h5>
            )}
            {service.PeriodKompensatsiiMassiv.PeriodKompensatsii && (
              <p className={styles.CompensationperiodText}>
                {parse(service.PeriodKompensatsiiMassiv.PeriodKompensatsii)}
              </p>
            )}
          </div>
          <TimeIcon />
        </div>
      ) : (
        ''
      )}

      {service.Documenty.length || service.DocumentyDlyaPodachi.length ? (
        <div className={styles.Documents}>
          {service.Documenty.length ? (
            <div className={styles.DocsColumn}>
              <h5 className={styles.DocumentsTitle}>Официальные документы</h5>
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
          ) : (
            ''
          )}
          {service.DocumentyDlyaPodachi.length ? (
            <div className={styles.DocsColumn}>
              <h5 className={styles.DocumentsTitle}>
                Документы для подачи заявки
              </h5>
              {service.DocumentyDlyaPodachi.map((doc, index) => (
                <a
                  href={doc.DocDlyaPodachiLink}
                  key={index + doc.DocName}
                  className={styles.DocumentsItem}
                >
                  {doc.DocDlyaPodachiName}
                </a>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}

      <div className={styles.Actions}>
        {available ? (
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={openServiceForm}
          >
            Получить услугу
          </Button>
        ) : (
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Medium}
            onClick={openServiceForm}
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
