export enum FillingFormSections {
  Requisites = 'Реквизиты',
  RequestInfo = 'Заявка',
  Confirmations = 'Согласие',
  Documents = 'Документы',
}

export enum DefaultOptions {
  OrgName = 'Наименование организации',
  Address = 'Адрес ',
  FullName = 'ФИО контактного лица',
  Phone = 'Контактный телефон',
  Mail = 'Адрес электронной почты',
  Site = 'Официальный сайт в сети «Интернет» (при наличии)',
}

export enum FieldType {
  Text = 'Текстовое поле',
  Dropdown = 'Выпадающий список',
  Checkbox = 'Флажок',
  Files = 'Файлы',
  Float = 'Число с плавающей запятой',
}

export enum StageType {
  ContactInformation = 'Контактная информация',
  Description = 'Описание',
}
