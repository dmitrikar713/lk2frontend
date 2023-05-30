import { apiClient } from 'src/api/client/ApiClient';
import { Profile, profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';

export const updateProfile =
  (profile: Profile): AppThunk =>
  async (dispatch) => {
    try {
      // dispatch(profileSlice.actions.profileLoad());
      const response = await apiClient.post<Profile>('/profile', profile);
      dispatch(profileSlice.actions.profileLoadSuccess(response.data));
    } catch (error: any) {
      dispatch(profileSlice.actions.profileLoadError(error.message));
    }
  };
