import React, { FC, useEffect, useState } from 'react';
import { Button, ButtonType, Type } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { ThreeDots } from 'src/components/ThreeDots/ThreeDots';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { downloadPrintedVersion } from 'src/store/thunks/printed-version/DownloadPrintedVersion';
import { fetchPrintedVersion } from 'src/store/thunks/printed-version/FetchPrintedVersion';

import styles from '../NewRequest.module.scss';
import { DropdownList } from 'src/components/Header/dropdowns/DropdownList';

interface ConfirmingStepProps {
  onSubmit: (data: any) => void;
  submitTitle?: string;
}

export const ConfirmingStep: FC<ConfirmingStepProps> = ({
  onSubmit,
  submitTitle,
}) => {
  const dispatch = useAppDispatch();

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const {
    request: {
      serviceName,
      formData,
      serviceId,
      formConfig: { dictionary },
    },
    isLoading,
    request,
  } = useAppSelector((state) => state.requestReducer);

  const {
    formConfig: { fields },
  } = useAppSelector((state) => state.requestReducer.request);
  const { services } = useAppSelector((state) => state.servicesReducer);

  const { user, organization } = useAppSelector(
    (state) => state.profileReducer.profile
  );

  const printableData = {
    guid: request.serviceId,
    inn: organization.org_type === 'company' && organization.org_inn,
    LastName: user.user_last_name,
    FirstName: user.user_first_name,
    MiddleName: user.user_middle_name,
    Phone: user.user_phone,
    ...formData,
  };

  useEffect(() => {
    let pdfTitleId = '';
    let xmlTitleId = '';

    fields.map((field) => {
      if (field.name === 'Печатная форма заявки PDF') {
        pdfTitleId = field.parameterInApi;
      }
      if (field.name === 'Печатная форма заявки XML') {
        xmlTitleId = field.parameterInApi;
      }
    });

    dispatch(
      fetchPrintedVersion(
        '/request/pdf-print-form',
        printableData,
        pdfTitleId,
        'pdfPrintForm.pdf',
        services.find((serv) => {
          if (serv.IDUslugiIsRpp) {
            if (serv.IDUslugiIsRpp.length !== 0) {
              console.log('serv.IDUslugiIsRpp');
              console.log(serv.IDUslugiIsRpp);
              return serv.IDUslugiIsRpp[0] == request.serviceId;
            }
          }
        }).ApplicationTemplate
      )
    );
    dispatch(
      fetchPrintedVersion(
        '/request/xml-form',
        printableData,
        xmlTitleId,
        'xmlForm.xml',
        services.find((serv) => {
          if (serv.IDUslugiIsRpp) {
            if (serv.IDUslugiIsRpp.length !== 0) {
              console.log('serv.IDUslugiIsRpp');
              console.log(serv.IDUslugiIsRpp);
              return serv.IDUslugiIsRpp[0] == request.serviceId;
            }
          }
        }).ApplicationTemplate
      )
    );
  }, []);

  const handelDownloadPrintedVersion = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    event.preventDefault();
    dispatch(downloadPrintedVersion(printableData));
  };

  return isLoading ? (
    <>
      <Skeleton rows={2} withTitle />
      <Skeleton rows={10} withTitle />
    </>
  ) : (
    <>
      <Card title="Печатная форма заявки" styleWithBorder>
        <div>
          <span>Название: </span>
          <b>{serviceName || 'Услуга'}</b>
        </div>
      </Card>
      <Card title="Данные заявки" styleWithBorder>
        <div className={styles.RequestConfirmingExtraActions}>
          <div className={styles.RequestConfirmationsThreeDots}>
            <ThreeDots onClick={() => setDropdownOpen(!isDropdownOpen)} />
            <DropdownList
              onHide={() => setDropdownOpen(!isDropdownOpen)}
              isShown={isDropdownOpen}
              className={styles.DropDown}
            >
              <span
                className={styles.HeaderDropdownItem}
                onClick={(event) => handelDownloadPrintedVersion(event)}
              >
                Скачать
              </span>
            </DropdownList>
          </div>
        </div>
        {JSON.stringify(dictionary)}
        {Object.keys(formData)
          .sort()
          .map((formKey) => (
            <div key={formKey}>
              {/* <p>{formKey} s</p> */}
              <span className={styles.RequestConfirmingBody}>
                {/* {dictionary.length
                  ? dictionary[formKey]
                    ? dictionary[formKey]['name']
                      ? dictionary[formKey]['name'] + ': '
                      : ''
                    : ''
                  : ''} */}
                {dictionary[formKey].name || dictionary[formKey]}:{' '}
              </span>
              <b>
                {typeof formData[formKey] === 'object'
                  ? formData[formKey].name
                  : typeof formData[formKey] === 'string'
                  ? formData[formKey]
                  : typeof formData[formKey] === 'boolean'
                  ? formData[formKey]
                    ? 'да'
                    : 'нет'
                  : ''}
              </b>
            </div>
          ))}
      </Card>
      <div className={styles.RequestControls}>
        <Button onClick={() => onSubmit(1)}>{submitTitle}</Button>
        <Button
          type={ButtonType.Secondary}
          buttonType={Type.Button}
          onClick={() => onSubmit(-1)}
        >
          Изменить
        </Button>
      </div>
    </>
  );
};
