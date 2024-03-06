import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { exportsSlice } from 'src/pages/Exports/ExportsSlice';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';

export const sendExportsAnswers =
  (answers): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.post('/exports/sendAnswers', answers);
      const responseResults = await apiClient.get('/profile/testresults');
      console.log('fetchTestResults resp');
      console.log(response);
      if (response.data)
        dispatch(profileSlice.actions.setTestResults(responseResults.data));
    } catch (error: any) {
      dispatch(exportsSlice.actions.exportsLoadError(error.message));
    }
  };
