import { apiClient } from 'src/api/client/ApiClient';
import {
  Notification,
  notificationsSlice,
} from 'src/pages/Notifications/NotificationsSlice';
import { AppThunk } from '../../store';

export const readNotifications = (): AppThunk => async (dispatch) => {
  try {
    await apiClient.get<Array<Notification>>('/notifications/read/all');
  } catch (error: any) {
    dispatch(notificationsSlice.actions.notificationsLoadError(error.message));
  }
};
