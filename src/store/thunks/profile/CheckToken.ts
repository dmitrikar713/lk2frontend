import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';
import { callbackSlice } from 'src/pages/Callback/CallbackSlice';

export const checkToken = (): AppThunk => async (dispatch) => {
  try {
    dispatch(callbackSlice.actions.setLoading(true));
    const response = await apiClient.get('/auth/checktoken');
    console.log(response);
    if (!response.data) {
      console.log('checkToken thunk !response.data');
      dispatch(callbackSlice.actions.goBack(window.location.pathname));
      // window.location.pathname = '/api/login';
      // window.location.pathname = '/';
    } else {
      dispatch(callbackSlice.actions.setToken(true));

      dispatch(callbackSlice.actions.setLoading(false));
    }
  } catch (error: any) {
    dispatch(profileSlice.actions.profileLoadError(error.message));
  }
};
