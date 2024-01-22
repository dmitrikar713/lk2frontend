import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';
import { callbackSlice } from 'src/pages/Callback/CallbackSlice';
import { Auth } from 'src/api/auth';

export const checkToken = (): AppThunk => async (dispatch) => {
  try {
    console.log('checkToken');
    // dispatch(callbackSlice.actions.setLoading(true));
    const response = await apiClient.get('/auth/checktoken');
    console.log(response);
    if (!response.data) {
      console.log('checkToken thunk !response.data');
      dispatch(callbackSlice.actions.goBack(window.location.pathname));
      dispatch(callbackSlice.actions.setToken(false));
      Auth.clear();
      // Auth.authorize();
    } else {
      dispatch(callbackSlice.actions.setToken(true));
    }
  } catch (error: any) {
    dispatch(profileSlice.actions.profileLoadError(error.message));
  }
};
