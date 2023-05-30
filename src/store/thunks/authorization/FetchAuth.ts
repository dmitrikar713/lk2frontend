import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';
import { Auth } from 'src/api/auth';
import { StringObject } from 'src/entities/BaseTypes';
import { callbackSlice } from 'src/pages/Callback/CallbackSlice';
import Toast from 'src/components/Toast';

export const fetchAuth =
  (data: StringObject): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.get(`/auth?code=${data.code}`);
      Auth.setAuthData({
        access_token: response.data,
      });
      dispatch(callbackSlice.actions.setToken(true));
      dispatch(callbackSlice.actions.callbackLoadError(''));
    } catch (error: any) {
      let resError = '';
      if (error.response && error.response.data) resError = error.response.data;
      else resError = String(error);
      dispatch(callbackSlice.actions.callbackLoadError(resError));
      Toast(resError, {
        type: 'error',
      });
      setTimeout(() => Auth.logOut(String(process.env.APP_LOGOUT_URL)), 1000);
    }
  };
