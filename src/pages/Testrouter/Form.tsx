import React, { FC, useEffect, useState } from 'react';
import { Form } from 'src/components/Form/Form';
import { Input, InputType } from 'src/components/Input/Input';
import { UserInfo, OrganizationInfo } from 'src/entities/Forms';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import styles from './Testrouter.module.scss';
import { Select } from 'src/components/Select/Select';
import { TestrouterSlice } from './TestrouterSlice';

import { DropDownItem } from 'src/components/DropDownItem/DropDownItem';

//  enum OrganizationInfo {
//   org_name = 'Полное наименование организации',
//   org_name_short = 'Сокращенное наименование организации',
//   org_organization_form = 'Организационно-правовая форма',
//   org_OGRN = 'ОГРН',
//   org_CPP = 'КПП',
//   org_address_legal = 'Юридический адрес',
//   org_address = 'Фактический адрес',
//   org_email = 'Адрес электронной почты организации',
//   org_phone = 'Телефон организации',
//   org_site = "Официальная страница в информационно-телекоммуникационной сети 'Интернет'",
//   org_OKVED = 'ОКВЭД',
//   org_OCPO = 'ОКПО',
//   org_exports_market = 'Текущие экспортные рынки',
//   org_exports_amount = 'Объем экспорта за последний отчетный год',
//   org_OGRNIP = 'ОГРНИП',
//   org_inn = 'ИНН',
// }

// export enum InputType {
//   Text = 'Text',
//   Password = 'Password',
//   Phone = 'Phone',
//   Email = 'Email',
//   Search = 'Search',
//   Float = 'Number',
// }

// TODO подключить Select к Form. На данный момент проверка заполнения ручная. Должна проводиться в Компоненте Form.
// TODO поля нужно делать disabled в случае, если данные уже получены из Bitrix.

// Все поля кроме Region хранятся в Form до Submit. После этого, при успешной отправке формы значения записываются в Redux.
// Значение поля Region хранится в Redux изначально, проверка заполнения проходит в данном компоненте, в обход Form.
// Дефолтные значения на данный момент берутся из Redux.

const TestrouterForm = () => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({});

  const {
    email,
    region,
    regionOptions,
    fullOrgName,
    ogrn,
    inn,
    representativeFullName,
    representativePosition,
    representativeEmail,
    representativePhone,
  } = useAppSelector((state) => state.TestrouterReducer.form);
  function toSurvey() {
    dispatch(TestrouterSlice.actions.setStage('survey'));
  }
  const formData = useAppSelector((state) => state.TestrouterReducer.form);

  const setFormFieldValue = (fieldName, valuee) => {
    dispatch(
      TestrouterSlice.actions.setFormFieldValue({
        fieldName: fieldName,
        valuee: valuee,
      })
    );
  };
  function handleSubmit(val) {
    console.log(val);
  }

  useEffect(() => {
    setFormState(formData);
  }, [formData]);
  const selectTitle = () => {
    return <p>Регион {}</p>;
  };

  return (
    <Form
      defaultValues={{
        email,
        fullOrgName,
        ogrn,
        inn,
        representativeFullName,
        representativePosition,
        representativeEmail,
        representativePhone,
      }}
      changeTracking
      onSubmit={(e) => {
        toSurvey();
      }}
      isDisabledOriginally
      dataToChange={formState}
    >
      <div className={styles.FormContent}>
        <h6 className={styles.QuestionGroupTitle}>Ваши данные</h6>
        <Input
          className={styles.TestrouterInput50}
          name={'Email'}
          label={'Email'}
          type={InputType.Email}
          disabled={false}
        />
        <Select
          className={styles.TestrouterSelect}
          value={region}
          defaultValue={regionOptions[0]}
          onChange={(value) => {
            setFormFieldValue('region', value);
          }}
          renderInputValue={(value) => (
            <>
              <p>Регион</p>
              {value ? (
                <div className={styles.TestrouterSelectValue}>{region}</div>
              ) : (
                <span className={styles.TestrouterSelectPlaceholder}>
                  Регион Вашего ЦПЭ
                </span>
              )}
            </>
          )}
        >
          {regionOptions.map((opt: any, index) => (
            <DropDownItem role="option" value={opt} key={index}>
              {opt}
            </DropDownItem>
          ))}
        </Select>

        <h6 className={styles.QuestionGroupTitle}>Данные компании</h6>
        <Input
          className={styles.TestrouterInput100}
          name={'orgFullName'}
          label={'Полное наименование организации'}
          type={InputType.Text}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'ogrn'}
          label={'ОГРН'}
          type={InputType.Text}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'inn'}
          label={'ИНН'}
          type={InputType.Text}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'representativeFullName'}
          label={'ФИО представителя компании'}
          type={InputType.Text}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'representativePosition'}
          label={'Должность представителя компании'}
          type={InputType.Text}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'representativeEmail'}
          label={'Email представителя компании'}
          type={InputType.Email}
          disabled={false}
        />
        <Input
          className={styles.TestrouterInput50}
          name={'representativePhone'}
          label={'Телефон представителя компании'}
          type={InputType.Phone}
          disabled={false}
        />
      </div>
    </Form>
  );
};

export default TestrouterForm;
