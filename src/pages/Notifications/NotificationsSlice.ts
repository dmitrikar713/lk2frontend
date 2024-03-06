import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  requestId: string;
  serviceName: string;
  number: string;
  date: string;
  smileIcon: string;
  notification: string;
  notificationStatus: string;
}

interface NotificationsState {
  notifications: Array<Notification>;
  isLoading: boolean;
  error: string;
}

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
  error: '',
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsLoad(state) {
      state.isLoading = true;
    },
    notificationsLoadSuccess(
      state,
      action: PayloadAction<Array<Notification>>
    ) {
      state.isLoading = false;
      state.error = '';
      state.notifications = action.payload;
    },
    notificationsLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setNotifications(state, action: PayloadAction<Array<Notification>>) {
      state.notifications = action.payload;
    },
  },
});

export default notificationsSlice.reducer;
