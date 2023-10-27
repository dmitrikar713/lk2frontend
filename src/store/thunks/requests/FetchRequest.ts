import { apiClient } from 'src/api/client/ApiClient';
import { Request, requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchRequest =
  (requestId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      console.log('reqId');
      console.log(requestId);
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.get<Request>(
        `/requests?id=${requestId}`
      );
      console.log('fetchRequest single. response:');
      console.log(response);
      dispatch(requestSlice.actions.requestLoadSuccess(response.data));
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
