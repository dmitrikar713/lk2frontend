import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { testrouterSlice } from 'src/pages/Testrouter/TestrouterSlice';

export const fetchTestrouterQuestions = (): AppThunk => async (dispatch) => {
  try {
    const response = await apiClient.get('/testrouter/getQuestions');
    if (response.data)
      dispatch(testrouterSlice.actions.setSuccess(response.data));
  } catch (error: any) {
    dispatch(testrouterSlice.actions.setError(error.message));
  }
};
