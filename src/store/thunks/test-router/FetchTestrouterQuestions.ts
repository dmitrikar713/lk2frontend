import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { testrouterSlice } from 'src/pages/Testrouter/TestrouterSlice';

export const fetchTestrouterQuestions = (): AppThunk => async (dispatch) => {
  try {
    dispatch(testrouterSlice.actions.setLoading(true));
    const response = await apiClient.get('/testrouter/getQuestions');
    if (response.data && response.data) {
      console.log(response.data);
      dispatch(testrouterSlice.actions.setSuccess(response.data));
    }
  } catch (error: any) {
    dispatch(testrouterSlice.actions.setError(error.message));
  }
};
