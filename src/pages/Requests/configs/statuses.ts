import { RequestCommonStatuses, RequestStatuses } from 'src/entities/Statuses';

type RequestsStatusesInfo = {
  [key in RequestStatuses]: {
    title: string;
    common_status: RequestCommonStatuses;
  };
};

export const requestsStatusesInfo: RequestsStatusesInfo = {
  new: {
    title: 'Новая',
    common_status: RequestCommonStatuses.Processing,
  },
  registered: {
    title: 'Заявка зарегистрирована',
    common_status: RequestCommonStatuses.Processing,
  },
  under_review: {
    title: 'На проверке',
    common_status: RequestCommonStatuses.Processing,
  },
  additional_request: {
    title: 'Дополнительный запрос',
    common_status: RequestCommonStatuses.Processing,
  },
  docs_send: {
    title: 'Дополнительные документы получены от заявителя',
    common_status: RequestCommonStatuses.Processing,
  },
  act_ready: {
    title: 'Подготовка Акта',
    common_status: RequestCommonStatuses.Processing,
  },
  in_work: {
    title: 'В работе',
    common_status: RequestCommonStatuses.Processing,
  },
  commission_appointed: {
    title: 'Назначена комиссия',
    common_status: RequestCommonStatuses.Processing,
  },
  reserve: {
    title: 'Резерв',
    common_status: RequestCommonStatuses.Processing,
  },
  commission_approved: {
    title: 'Одобрено комиссией',
    common_status: RequestCommonStatuses.Processing,
  },
  penalties: {
    title: 'Штрафные санкции',
    common_status: RequestCommonStatuses.Processing,
  },
  penalties_paid: {
    title: 'Штраф оплачен',
    common_status: RequestCommonStatuses.Processing,
  },
  act_sent: {
    title: 'Акт направлен заявителю',
    common_status: RequestCommonStatuses.Processing,
  },
  request_approved: {
    title: 'Заявка одобрена',
    common_status: RequestCommonStatuses.Processing,
  },
  act_signed: {
    title: 'Акт подписан',
    common_status: RequestCommonStatuses.Processing,
  },
  service_provided: {
    title: 'Услуга оказана',
    common_status: RequestCommonStatuses.Completed,
  },
  closed: {
    title: 'Закрыта',
    common_status: RequestCommonStatuses.Completed,
  },
  draft: {
    title: 'Черновик',
    common_status: RequestCommonStatuses.Draft,
  },
};
