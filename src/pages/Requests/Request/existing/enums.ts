export enum Actions {
  additionalDocs = 'Предоставить дополнительные документы',
  recallRequest = 'Отозвать заявку',
  cancelRequest = 'Отказ заявителя от получения услуги',
  addAct = 'Подписание акта заявителем',
  recallAdditionalRequest = 'Отзыв заявки заявителем (доп.действие)',
}

export enum CancelRequest {
  Recall = 'Отозвать заявку',
  Cancell = 'Отказаться от услуги',
}

export enum CancelButton {
  Recall = 'Вы действительно хотите отозвать заявку?',
  Cancell = 'Вы действительно хотите отказаться от получения услуги?',
}

export enum ConfirmationSteps {
  Sign = 1,
  Send = 2,
}
