import { apiClient } from 'src/api/client/ApiClient';
import { Request, requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchRequest =
  (requestId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.get<Request>(
        `/requests?id=${requestId}`
      );
      dispatch(requestSlice.actions.requestLoadSuccess(response.data));
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
