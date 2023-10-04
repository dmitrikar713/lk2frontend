import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';
import { callbackSlice } from 'src/pages/Callback/CallbackSlice';

export const checkToken = (): AppThunk => async (dispatch) => {
  console.log('checkToken thunk');
  try {
    const response = await apiClient.get('/auth/checktoken');
    if (!response.data) {
      dispatch(callbackSlice.actions.goBack(window.location.pathname));
      window.location.pathname = '/api/login';
    } else {
      dispatch(callbackSlice.actions.setToken(true));
    }
  } catch (error: any) {
    dispatch(profileSlice.actions.profileLoadError(error.message));
  }
};
