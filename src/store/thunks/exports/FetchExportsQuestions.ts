import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { exportsSlice } from 'src/pages/Exports/ExportsSlice';

export const fetchExportsQuestions = (): AppThunk => async (dispatch) => {
  try {
    dispatch(exportsSlice.actions.exportsLoad());
    const response = await apiClient.get('/exports/getQuestions');
    console.log('fetchExportsQuestions:');
    console.log(response);
    if (response.data)
      dispatch(exportsSlice.actions.exportsLoadSuccess(response.data));
  } catch (error: any) {
    dispatch(exportsSlice.actions.exportsLoadError(error.message));
  }
};
