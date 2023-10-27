import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { exportsSlice } from 'src/pages/Exports/ExportsSlice';

export const sendExportsAnswers =
  (answers): AppThunk =>
  async (dispatch) => {
    try {
      console.log('sendExportsAnswers');
      const response = await apiClient.post('/exports/sendAnswers', answers);
      console.log(response.status);
    } catch (error: any) {
      dispatch(exportsSlice.actions.exportsLoadError(error.message));
      console.log(error.message);
    }
  };
