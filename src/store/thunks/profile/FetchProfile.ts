import { Profile, profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { apiClient } from 'src/api/client/ApiClient';

export const fetchProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(profileSlice.actions.profileLoad());
    const response = await apiClient.get<Profile>('/profile');
    dispatch(profileSlice.actions.profileLoadSuccess(response.data));
  } catch (error: any) {
    dispatch(profileSlice.actions.profileLoadError(error.message));
  }
};
