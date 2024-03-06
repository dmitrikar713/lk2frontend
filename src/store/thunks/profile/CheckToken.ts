import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';
import { callbackSlice } from 'src/pages/Callback/CallbackSlice';
import { Auth } from 'src/api/auth';

export const checkToken = (): AppThunk => async (dispatch) => {
  try {
    const response = await apiClient.get('/auth/checktoken');
    if (!response.data) {
      dispatch(callbackSlice.actions.goBack(window.location.pathname));
      dispatch(callbackSlice.actions.setToken(false));
      dispatch(callbackSlice.actions.setLoading(false));
      // window.location.pathname = '/';
      // window.location.pathname = '/api/login';
      // window.location.href = process.env.APP_LOGOUT_URL;
    } else {
      dispatch(callbackSlice.actions.setToken(true));
      dispatch(callbackSlice.actions.setLoading(false));
    }
  } catch (error: any) {
    dispatch(profileSlice.actions.profileLoadError(error.message));
  }
};
