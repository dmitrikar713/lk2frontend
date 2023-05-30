import { apiClient } from 'src/api/client/ApiClient';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchDraft =
  (id?: string): AppThunk =>
  async (dispatch) => {
    try {
      let response;

      if (id) response = await apiClient.get(`/request/get-draft?id=${id}`);
      else response = await apiClient.get('/request/get-draft');

      response.data &&
        dispatch(requestSlice.actions.setDraft(response.data.value));
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
