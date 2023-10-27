import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';

export const fetchTestResults = (): AppThunk => async (dispatch) => {
  const response = await apiClient.get('/profile/testresults');
  console.log('fetchTestResults resp');
  console.log(response);
  if (response.data)
    dispatch(profileSlice.actions.setTestResults(response.data));
};
