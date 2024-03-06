import { requestsSlice } from 'src/pages/Requests/RequestsSlice';
import { apiClient } from 'src/api/client/ApiClient';
import {
  Notification,
  notificationsSlice,
} from 'src/pages/Notifications/NotificationsSlice';

import { AppThunk } from '../../store';

export const fetchNotifications = (): AppThunk => async (dispatch) => {
  try {
    dispatch(notificationsSlice.actions.notificationsLoad());
    const response = await apiClient.get<Array<Notification>>('/notifications');
    dispatch(
      notificationsSlice.actions.notificationsLoadSuccess(response.data)
    );
    // dispatch(requestsSlice.actions.requestsSetNotifications(response.data));
  } catch (error: any) {
    dispatch(notificationsSlice.actions.notificationsLoadError(error.message));
  }
};
