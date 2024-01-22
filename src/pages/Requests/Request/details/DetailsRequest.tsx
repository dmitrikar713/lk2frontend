import React, { FC, useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'src/components/Card/Card';
import { ProfileIcons } from 'src/components/ProfileIcons/ProfileIcons';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { Form } from 'src/components/Form/Form';
import { ScrollAnchor } from 'src/components/ScrollAnchor/ScrollAnchor';
import { Checkbox, CheckboxSize } from 'src/components/Checkbox/Checkbox';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { Select } from 'src/components/Select/Select';
import { DropDownItem } from 'src/components/DropDownItem/DropDownItem';
import { Input, InputType } from 'src/components/Input/Input';
import { FormFieldParameters } from 'src/entities/Forms';
import {
  FieldType,
  FillingFormSections,
  StageType,
} from 'src/entities/Request';

import styles from '../new/NewRequest.module.scss';
import { fetchRequestDetails } from 'src/store/thunks/requests/FetchRequestDetails';
import { DocumentStatuses } from 'src/entities/Statuses';
import { RoutePaths } from 'src/entities/Routes';

interface Dictionarie {
  id: React.Key | null | undefined;
  name:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

const DetailsRequest: FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { request } = useAppSelector((state) => state.requestReducer);
  const { fields, value, isLoading } = useAppSelector(
    (state) => state.detailsReducer
  );
  const notifications = useAppSelector(
    (state) => state.notificationsReducer.notifications
  );

  const [dataToChange, setDataToChange] = useState({});

  useEffect(() => dispatch(fetchRequestDetails(requestId)), []);
  useEffect(() => {
    setDataToChange(value);
  }, [value]);

  const checkFieldValue = (listFilledFields: {}, fieldId: string) =>
    Object.keys(listFilledFields).includes(fieldId);

  const requisites = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Text &&
      field.stage.description === StageType.ContactInformation &&
      checkFieldValue(value, field.parameterInApi)
  );
  const requestInfo = fields.filter(
    (field: FormFieldParameters) =>
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Text &&
        field.stage.description === StageType.Description &&
        checkFieldValue(value, field.parameterInApi)) ||
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Dropdown &&
        field.stage.description === StageType.Description &&
        checkFieldValue(value, field.parameterInApi)) ||
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Float &&
        field.stage.description === StageType.Description &&
        checkFieldValue(value, field.parameterInApi))
  );
  const confirmations = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Checkbox &&
      checkFieldValue(value, field.parameterInApi)
  );
  const documents = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Files &&
      checkFieldValue(value, field.parameterInApi)
  );

  const formSections = [
    { name: FillingFormSections.Requisites, fields: requisites },
    { name: FillingFormSections.RequestInfo, fields: requestInfo },
    { name: FillingFormSections.Confirmations, fields: confirmations },
    { name: FillingFormSections.Documents, fields: documents },
  ];

  const requisitesSectionRef = useRef<HTMLDivElement | null>(null);
  const requestSectionRef = useRef<HTMLDivElement | null>(null);
  const confirmSectionRef = useRef<HTMLDivElement | null>(null);
  const docsSectionRef = useRef<HTMLDivElement | null>(null);

  const sectionsRefs = [
    requisitesSectionRef,
    requestSectionRef,
    confirmSectionRef,
    docsSectionRef,
  ];

  const previewDocument = (downloadUrl: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className={styles.Request}>
      <Card className={styles.CardTitle} styleWithBorder>
        <>
          <div className={styles.RequestTopPanelSection}>
            <Breadcrumbs
              withArrowBack
              breadcrumbList={[
                {
                  title: 'Назад в Бизнесмаркет',
                  path: RoutePaths.SERVICES,
                },
              ]}
            />
          </div>
          <div className={styles.RequestTopPanelSection}>
            <div className={styles.RequestTopPanelTitle}>
              {request.serviceName || 'Услуга'}
            </div>
            <span className={styles.RequestTopPanelDate}>
              {new Date().toLocaleDateString('ru')}
            </span>
          </div>
        </>
      </Card>
      {isLoading ? (
        <>
          <Skeleton rows={5} withTitle />
          <Skeleton rows={3} withTitle />
          <Skeleton rows={5} withTitle />
          <Skeleton rows={3} withTitle />
        </>
      ) : (
        <>
          <div className={styles.RequestSectionAnchors}>
            {sectionsRefs.map((ref, index) => (
              <ScrollAnchor
                key={`${index + 1}`}
                title={formSections[index].name}
                anchorRef={ref}
              />
            ))}
          </div>
          <Form
            dataToChange={dataToChange}
            defaultValues={value}
            onSubmit={() => null}
            readonly
          >
            <>
              {formSections.map((section, index) => (
                <React.Fragment key={section.name}>
                  <div ref={sectionsRefs[index]} />
                  <Card title={section.name} collapsible styleWithBorder>
                    <div
                      className={
                        section.name === FillingFormSections.Documents
                          ? documents.length % 2 === 0
                            ? styles.GridDocumentUploaderEven
                            : styles.GridDocumentUploaderOdd
                          : ''
                      }
                    >
                      {section.fields.map((field: any) => (
                        <React.Fragment key={field.parameterInApi}>
                          {section.name ===
                          FillingFormSections.Confirmations ? (
                            <Checkbox
                              hookControlled
                              name={field.parameterInApi}
                              label={field.name}
                              onClick={() => null}
                              size={CheckboxSize.Small}
                              disabled
                            />
                          ) : section.name === FillingFormSections.Documents ? (
                            <div
                              className={
                                documents.length % 2 === 0
                                  ? styles.GridDocumentUploader
                                  : ''
                              }
                            >
                              <DocumentUploader
                                documentName={field.name}
                                documentType={''}
                                readonly
                                download
                                onDownload={() =>
                                  previewDocument(value[field.parameterInApi])
                                }
                                documentUploaded={{
                                  file: 'plug',
                                  status: DocumentStatuses.Empty,
                                  uploadedAt: 'plug',
                                  fileName: 'plug',
                                  type: 'plug',
                                }}
                              />
                            </div>
                          ) : field.fieldType.id === 2406 ? (
                            <>
                              <Select
                                value={
                                  value[field.parameterInApi]
                                    ? value[field.parameterInApi]
                                    : ''
                                }
                                disabled
                                onChange={() => null}
                                renderInputValue={() => (
                                  <div className={styles.SelectWrapper}>
                                    <div className={styles.SelectLabel}>
                                      {field.name}
                                    </div>
                                    {field.fieldType.dictionaries.map(
                                      (dictionarie: Dictionarie) => {
                                        if (
                                          dictionarie.name ===
                                          String(value[field.parameterInApi])
                                        ) {
                                          return (
                                            <div
                                              className={styles.SelectValue}
                                              key={dictionarie.id}
                                            >
                                              {dictionarie.name}
                                            </div>
                                          );
                                        }
                                      }
                                    )}
                                  </div>
                                )}
                              >
                                {field.fieldType.dictionaries.map(
                                  (dic: any) => (
                                    <DropDownItem
                                      role="option"
                                      value={dic.id}
                                      key={dic.id}
                                    >
                                      {dic.name}
                                    </DropDownItem>
                                  )
                                )}
                              </Select>
                            </>
                          ) : (
                            <Input
                              name={field.parameterInApi}
                              label={field.name}
                              disabled
                              type={
                                /телефон/.test(field.name)
                                  ? InputType.Phone
                                  : /Э|электронн[a-я]{2,3} почт[a-я]{1,3}/.test(
                                      field.name
                                    )
                                  ? InputType.Email
                                  : InputType.Text
                              }
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </Card>
                </React.Fragment>
              ))}
            </>
          </Form>
        </>
      )}
    </div>
  );
};

export default DetailsRequest;
