export enum UserInfo {
  user_last_name = 'Фамилия',
  user_first_name = 'Имя',
  user_middle_name = 'Отчество',
  user_phone = 'Телефон',
  user_email = 'Email',
  user_post = 'Должность',
}

export enum OrganizationInfo {
  org_name = 'Полное наименование организации',
  org_name_short = 'Сокращенное наименование организации',
  org_organization_form = 'Организационно-правовая форма',
  org_OGRN = 'ОГРН',
  org_CPP = 'КПП',
  org_address_legal = 'Юридический адрес',
  org_address = 'Фактический адрес',
  org_email = 'Адрес электронной почты организации',
  org_phone = 'Телефон организации',
  org_site = "Официальная страница в информационно-телекоммуникационной сети 'Интернет'",
  org_OKVED = 'ОКВЭД',
  org_OCPO = 'ОКПО',
  org_exports_market = 'Текущие экспортные рынки',
  org_exports_amount = 'Объем экспорта за последний отчетный год',
  org_OGRNIP = 'ОГРНИП',
  org_inn = 'ИНН',
}

export interface FieldWithDictionary {
  name: string;
  dictionary: string;
}

export interface FormData {
  [key: string]: string & FieldWithDictionary;
}

export interface FormFieldParameters {
  name: string;
  type?: string;
  description: string | null;
  parameterInApi: string;
  fieldType: {
    id: number;
    name: string;
    code: number | null;
    dictionaries: Array<{
      id: string;
      name: string;
      code: number | null;
      dictionaries: [];
    }>;
  };
  required: boolean;
  signatureRequired: boolean;
  inner: boolean;
  url: string | null;
  signatures: [];
  maxSignaturesCount: number | null;
  digitalStorageType: {
    name: string;
    outerId: number | null;
    outerName: string | null;
    fileFormats: string | null;
    fileSizeMaxByte: number;
  };
  visibility: boolean;
  isUserFill: boolean;
  readOnly: boolean;
  measureServiceParamValueGroup: number | null;
  stage: {
    order: number;
    name: string;
    description: string;
    group: string | null;
  };
  inputMask: string | null;
}
