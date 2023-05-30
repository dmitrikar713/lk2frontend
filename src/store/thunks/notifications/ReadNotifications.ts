import { apiClient } from 'src/api/client/ApiClient';
import {
  Notification,
  notificationsSlice,
} from 'src/pages/Notifications/NotificationsSlice';
import { AppThunk } from '../../store';

export const readNotifications = (): AppThunk => async (dispatch) => {
  try {
    dispatch(notificationsSlice.actions.notificationsLoad());
    const response = await apiClient.get<Array<Notification>>(
      '/notifications/read/all'
    );
    dispatch(
      notificationsSlice.actions.notificationsLoadSuccess(response.data)
    );
  } catch (error: any) {
    dispatch(notificationsSlice.actions.notificationsLoadError(error.message));
  }
};
