import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatuses } from 'src/entities/Statuses';
import { RequestStages } from 'src/entities/Subjects';
import { Notification } from '../Notifications/NotificationsSlice';

export interface RequestFilter {
  title: RequestFilterTitle;
  value: string;
}
export enum RequestFilterTitle {
  All = 'Все',
  Processing = 'В обработке',
  Completed = 'Завершенные',
  Draft = 'Черновики',
}
export enum RequestStatusTitle {
  Processing = 'В работе',
  Completed = 'Завершено',
  Draft = 'Черновик',
}
export interface Request {
  id: string;
  serviceName: string;
  number: string;
  createdAt: string;
  statusName: RequestStatuses;
  smileIcon: string;
  notification: string;
  stages: RequestStages[];
  serviceId: string;
}
interface RequestsState {
  requests: Array<Request>;
  isLoading: boolean;
  error: string;
}

const initialState: RequestsState = {
  requests: [],
  isLoading: false,
  error: '',
};
export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    requestsLoad(state) {
      state.isLoading = true;
    },
    requestsLoadSuccess(state, action: PayloadAction<Array<Request>>) {
      state.isLoading = false;
      state.error = '';
      state.requests = action.payload;
    },
    requestsLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    requestsRemoveOne(state, action: PayloadAction<string>) {
      state.requests = state.requests.filter(
        (request: { id: string }) => request.id !== action.payload
      );
    },
    requestsRemoveAllDrafts(state) {
      state.requests = state.requests.filter(
        (request: { statusName: RequestStatuses }) =>
          request.statusName !== RequestStatuses.Draft
      );
    },
    requestsSetNotifications(
      state,
      action: PayloadAction<Array<Notification>>
    ) {
      action.payload.map((notify) => {
        state.requests.map((request: { number: any; notification: string }) => {
          if (Number(request.number) === Number(notify.number))
            request.notification = notify.notification;
        });
      });
    },
  },
});

export default requestsSlice.reducer;
