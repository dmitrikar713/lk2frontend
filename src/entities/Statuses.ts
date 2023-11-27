export enum DocumentStatuses {
  Empty = 'Empty',
  Verified = 'Verified',
  NotVerified = 'NotVerified',
  SentForVerified = 'SentForVerified',
  Signed = 'Signed',
  NotSigned = 'NotSigned',
  Archive = 'Archive',
}

// общие статусы (закрыта, в обработке, черновик)
export enum RequestCommonStatuses {
  Processing = 'Processing',
  Completed = 'Completed',
  Draft = 'Draft',
}

export enum RequestStatuses {
  New = 'new',
  Draft = 'draft',
  Registered = 'registered',
  UnderReview = 'under_review',
  AdditionalRequest = 'additional_request',
  InWork = 'in_work',
  CommissionAppointed = 'commission_appointed',
  Reserve = 'reserve',
  CommissionApproved = 'commission_approved',
  Penalties = 'penalties',
  PenaltiesPaid = 'penalties_paid',
  ActSent = 'act_sent',
  RequestApproved = 'request_approved',
  ActSigned = 'act_signed',
  ServiceProvided = 'service_provided',
  Closed = 'closed',
  DocsSend = 'docs_send',
  act_ready = 'act_ready',
}

export enum RequestStatus {
  Closed = 'Closed',
  inWork = 'inWork',
  Pending = 'Pending',
}
