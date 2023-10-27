import React, { FC, useEffect, useRef, useState } from 'react';
import { Card } from 'src/components/Card/Card';
import { Checkbox, CheckboxSize } from 'src/components/Checkbox/Checkbox';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { Form } from 'src/components/Form/Form';
import { Input, InputType } from 'src/components/Input/Input';
import { ScrollAnchor } from 'src/components/ScrollAnchor/ScrollAnchor';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import styles from '../NewRequest.module.scss';
import { requestSlice, UploadedDocuments } from '../../RequestSlice';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { Modal } from 'src/components/Modal/Modal';
import { ConfirmForm } from 'src/components/ConfirmForm/ConfirmForm';
import { FormFieldParameters } from 'src/entities/Forms';
import Toast from 'src/components/Toast';
import { Select } from 'src/components/Select/Select';
import { DropDownItem } from 'src/components/DropDownItem/DropDownItem';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'src/entities/Routes';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';
import {
  DefaultOptions,
  FieldType,
  FillingFormSections,
  StageType,
} from 'src/entities/Request';
import { Button, ButtonType } from 'src/components/Button/Button';
import { ScrollWithShadow } from 'src/components/ScrollWithShadow/ScrollWithShadow';
import { fetchDraft } from 'src/store/thunks/requests/FetchDraft';
import { parseQuery } from 'src/common/utils/parseQuery';
import { createDraftRequest } from 'src/store/thunks/requests/CreateDraftRequest';
import { getBase64Url } from 'src/common/utils/base64Url';
import { DocumentStatuses } from 'src/entities/Statuses';

interface FillingStepProps {
  onSubmit: (data: any) => void;
  submitTitle?: string;
}

export const FillingStep: FC<FillingStepProps> = ({
  onSubmit,
  submitTitle,
}) => {
  const dispatch = useAppDispatch();

  const {
    formConfig: { fields, dictionary },
  } = useAppSelector((state) => state.requestReducer.request);

  const requisites = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Text &&
      field.stage.description === StageType.ContactInformation
  );
  const requestInfo = fields.filter(
    (field: FormFieldParameters) =>
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Text &&
        field.stage.description === StageType.Description) ||
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Dropdown &&
        field.stage.description === StageType.Description) ||
      (field.visibility &&
        field.isUserFill &&
        field.fieldType.name === FieldType.Float &&
        field.stage.description === StageType.Description)
  );
  const confirmations = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Checkbox
  );
  const documents = fields.filter(
    (field: FormFieldParameters) =>
      field.visibility &&
      field.isUserFill &&
      field.fieldType.name === FieldType.Files
  );

  const formSections = [
    { name: FillingFormSections.Requisites, fields: requisites },
    { name: FillingFormSections.RequestInfo, fields: requestInfo },
    { name: FillingFormSections.Confirmations, fields: confirmations },
    { name: FillingFormSections.Documents, fields: documents },
  ];

  const { request, isLoading, draft } = useAppSelector(
    (state) => state.requestReducer
  );
  const { formData, uploadedDocuments } = request;
  console.log('uploadedDocuments:');
  console.log(uploadedDocuments);

  const { user, organization } = useAppSelector(
    (state) => state.profileReducer.profile
  );

  const [formSelects, setFormSelects] = useState<any>(request.formSelectsValue);

  const requisitesSectionRef = useRef<HTMLDivElement | null>(null);
  const requestSectionRef = useRef<HTMLDivElement | null>(null);
  const confirmSectionRef = useRef<HTMLDivElement | null>(null);
  const docsSectionRef = useRef<HTMLDivElement | null>(null);

  const [isShownModalConfirm, setShownModalConfirm] = useState(false);
  const [isShownModalDraft, setShownModalDraft] = useState(false);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [useDraft, setUseDraft] = useState(false);
  const [dataToChange, setDataToChange] = useState({});
  const [draftFromUrl, setDraftFromUrl] = useState(false);

  const createDraft = (
    serviceId: string,
    formValue: { [x: string]: string },
    formSelectsValue: any[],
    uploadedDocuments: UploadedDocuments
  ) => {
    dispatch(
      createDraftRequest({
        serviceId: serviceId,
        formData: { ...formValue, ...formSelectsValue },
        uploadedDocuments,
      })
    );
  };

  const previewDocument = (downloadUrl: string | undefined) => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert('Пустой документ');
    }
  };

  const handleSubmitForm = (formData: any) => {
    // Поиск обязательного документа для вложения
    // todo - была захардкоженная проверка конкретного документа, наверно потом удалить нужно вообще
    // if (!Object.keys(uploadedDocuments).includes('p7348801')) {
    //   Toast(
    //     'Для подписания загрузите отчёт о финансовых результатах за 2 последних финансовых года',
    //     // 'Для подписания загрузите отчёт о финансовых результатах за 2 последних финансовых года'
    //     {
    //       type: 'error',
    //     }
    //   );
    //   return;
    // }
    const formSelectsCopy = { ...formSelects };
    Object.keys(formSelectsCopy).map((key) => {
      formSelectsCopy[key] = formSelectsCopy[key].name;
    });
    Object.keys(uploadedDocuments).map((key) => {
      delete formData[key];
    });
    dispatch(
      requestSlice.actions.setRequest({
        ...request,
        formData: { ...formData, ...formSelectsCopy },
        uploadedDocuments,
      })
    );
    setShownModalConfirm(true);
    createDraft(
      request.serviceId,
      formData,
      formSelectsCopy,
      uploadedDocuments
    );
  };

  const nextStep = () => onSubmit(1);

  const getFieldId = (fields: any, desiredField: string) => {
    for (const field in fields) {
      if (fields.hasOwnProperty(field))
        if (fields[field] === desiredField) return field;
    }
  };

  const sectionsRefs = [
    requisitesSectionRef,
    requestSectionRef,
    confirmSectionRef,
    docsSectionRef,
  ];

  // Hydrating form data with profile info

  const defaultValues: any = {
    [String(getFieldId(dictionary, DefaultOptions.OrgName))]:
      organization.org_name,
    [String(getFieldId(dictionary, DefaultOptions.Address))]:
      organization.org_address_legal,
    [String(
      getFieldId(dictionary, DefaultOptions.FullName)
    )]: `${user.user_last_name} ${user.user_first_name} ${user.user_middle_name}`,
    [String(getFieldId(dictionary, DefaultOptions.Phone))]:
      organization.org_phone,
    [String(getFieldId(dictionary, DefaultOptions.Mail))]:
      organization.org_email,
    [String(getFieldId(dictionary, DefaultOptions.Site))]:
      organization.org_site,
  };

  const fillAnotherFields = async () => {
    let allParams = { ...formSelects };

    const fillAllFields = async () => {
      request.formConfig.fields.forEach(async (field) => {
        if (field.fieldType.id === 2406) {
          const answer = field.fieldType.dictionaries.filter(
            (item) => item.name === draft[field.parameterInApi]
          );
          if (answer.length > 0) {
            answer.forEach((req) => {
              const { id, name } = req;
              allParams = {
                ...allParams,
                [field.parameterInApi]: {
                  name,
                  id,
                },
              };
            });
          }
        } else if (field.fieldType.id === 2416) {
          const url = draft[field.parameterInApi];
          if (url) {
            const base64Doc = await getBase64Url(url);
            const extension = url.substring(url.lastIndexOf('.') + 1);
            const documentData = {
              key: field.parameterInApi,
              document: {
                file: `data:application/${extension};base64,${base64Doc}`,
                status: DocumentStatuses.Empty,
                uploadedAt: '',
                fileName: `draft.${extension}`,
                title: '',
                url: url,
                type: url ? extension : '',
              },
            };
            dispatch(requestSlice.actions.setDocument(documentData));
          }
        }
        setFormSelects(allParams);
      });
    };
    await fillAllFields();
  };

  useEffect(() => {
    if (draftFromUrl) handleUseDraft(true);
    else Object.keys(draft).length && setShownModalDraft(true);
  }, [draft]);

  useEffect(() => {
    dispatch(requestSlice.actions.setFormSelectsValue(formSelects));
  }, [formSelects]);

  useEffect(() => {
    setDataToChange(useDraft ? { ...draft } : { ...formData });
  }, [formData, useDraft]);

  useEffect(() => {
    const search = parseQuery(window.location.search);
    if (search.draft) {
      setDraftFromUrl(true);
      dispatch(fetchDraft(search.draft));
    } else {
      dispatch(fetchDraft());
    }
  }, []);

  const handleUseDraft = async (useDraft: boolean) => {
    useDraft ? setUseDraft(true) : setUseDraft(false);
    setShownModalDraft(false);

    if (useDraft) {
      await fillAnotherFields();
    }
  };

  // Add default values to checkboxes
  request.formConfig.fields.forEach((field) => {
    if (field.fieldType.id === 2418) {
      defaultValues[field.parameterInApi as string] = false;
    }
  });

  const updatedCheckbox = formSections.map((section) => {
    if (section.name === FillingFormSections.Confirmations) {
      return section.fields.map((field: any) => {
        return field.parameterInApi;
      });
    }
  });

  return isLoading ? (
    <>
      <Skeleton rows={5} withTitle />
      <Skeleton rows={3} withTitle />
      <Skeleton rows={5} withTitle />
      <Skeleton rows={3} withTitle />
    </>
  ) : (
    <>
      <ScrollWithShadow className={styles.RequestSectionAnchors}>
        {sectionsRefs.map((ref, index) => (
          <ScrollAnchor
            key={`${index + 1}`}
            title={formSections[index].name}
            anchorRef={ref}
          />
        ))}
      </ScrollWithShadow>
      <Form
        defaultValues={defaultValues}
        dataToChange={dataToChange}
        checkedVales={updatedCheckbox}
        submitTitle={submitTitle}
        onSubmit={handleSubmitForm}
        draftRequest
        isCheckedAll={isCheckedAll}
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
                  {section.name === FillingFormSections.Requisites && (
                    <Link to={RoutePaths.PROFILE}>
                      <span className={styles.RequestSectionCardProfileRef}>
                        Изменить профиль
                      </span>
                    </Link>
                  )}
                  {section.name === FillingFormSections.Confirmations && (
                    <Checkbox
                      label={'Выбрать всё'}
                      checked={isCheckedAll}
                      onClick={() => setCheckedAll(!isCheckedAll)}
                      size={CheckboxSize.Small}
                    />
                  )}
                  {section.fields.map((field: any) => (
                    <React.Fragment key={field.parameterInApi}>
                      {section.name === FillingFormSections.Confirmations ? (
                        <Checkbox
                          hookControlled
                          name={field.parameterInApi}
                          label={field.name}
                          defaultRequired={field.required}
                          onClick={() => null}
                          size={CheckboxSize.Small}
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
                            documentType={field.type ? field.type : ''}
                            download={
                              uploadedDocuments[field.parameterInApi] &&
                              uploadedDocuments[field.parameterInApi].url
                                ? true
                                : false
                            }
                            onDownload={() =>
                              previewDocument(
                                uploadedDocuments[field.parameterInApi].url
                              )
                            }
                            onUpload={async (file, uploadedAt) => {
                              dispatch(
                                requestSlice.actions.setFormDocType({
                                  parameterInApi: field.parameterInApi,
                                  file,
                                })
                              );
                              dispatch(
                                requestSlice.actions.setDocument(
                                  await setDocumentProfile(
                                    field.parameterInApi,
                                    file,
                                    uploadedAt
                                  )
                                )
                              );
                            }}
                            deletable
                            onDelete={async () =>
                              dispatch(
                                requestSlice.actions.setDocument(
                                  await setDocumentProfile(
                                    field.parameterInApi,
                                    null
                                  )
                                )
                              )
                            }
                            documentUploaded={
                              uploadedDocuments[field.parameterInApi]
                            }
                          />
                        </div>
                      ) : field.fieldType.id === 2406 ? (
                        <Select
                          value={
                            formSelects[field.parameterInApi]
                              ? formSelects[field.parameterInApi].id
                              : ''
                          }
                          onChange={(value) => {
                            setFormSelects({
                              ...formSelects,
                              [field.parameterInApi]: {
                                id: value,
                                name: (dictionary[field.parameterInApi] as any)
                                  .dictionaries[value],
                              },
                            });
                          }}
                          renderInputValue={(value) => (
                            <div className={styles.SelectWrapper}>
                              {value ? (
                                <>
                                  <div className={styles.SelectLabel}>
                                    {field.name}
                                  </div>
                                  <div className={styles.SelectValue}>
                                    {formSelects[field.parameterInApi].name}
                                  </div>
                                </>
                              ) : (
                                <span className={styles.SelectPlaceholder}>
                                  {field.name}
                                </span>
                              )}
                            </div>
                          )}
                        >
                          {field.fieldType.dictionaries.map((dic: any) => (
                            <DropDownItem
                              role="option"
                              value={dic.id}
                              key={dic.id}
                            >
                              {dic.name}
                            </DropDownItem>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          name={field.parameterInApi}
                          label={field.name}
                          type={
                            /телефон/.test(field.name)
                              ? InputType.Phone
                              : /Э|электронн[a-я]{2,3} почт[a-я]{1,3}/.test(
                                  field.name
                                )
                              ? InputType.Email
                              : section.name === FillingFormSections.RequestInfo
                              ? InputType.Float
                              : InputType.Text
                          }
                          required={field.required}
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
      <Modal
        isShown={isShownModalDraft}
        onHide={() => handleUseDraft(false)}
        title={'Уважаемый Пользователь'}
      >
        <p className={styles.RequestModalDraftText}>
          Ранее вы не завершили подачу заявки на меру поддержки
        </p>
        <div className={styles.RequestModalDraftWrapperButtons}>
          <Button onClick={async () => await handleUseDraft(true)}>
            Продолжить заполнение
          </Button>
          <Button
            onClick={() => handleUseDraft(false)}
            type={ButtonType.Secondary}
          >
            Создать новую заявку
          </Button>
        </div>
      </Modal>
      <Modal
        isShown={isShownModalConfirm}
        onHide={() => setShownModalConfirm(false)}
      >
        <ConfirmForm
          textConfirm={
            'Я ознакомился и принимаю условия действующей оферты на предоставления услуг АНО "МЭЦ"'
          }
          onClick={nextStep}
        />
      </Modal>
    </>
  );
};
