import { apiClient } from 'src/api/client/ApiClient';
import { Request, requestsSlice } from 'src/pages/Requests/RequestsSlice';
import { AppThunk } from '../../store';
import { fetchNotifications } from '../notifications/FetchNotifications';
import { fetchFeedback } from 'src/store/thunks/feedback/FetchFeedback';

export const fetchRequests =
  (availableRequests: Request[]): AppThunk =>
  async (dispatch) => {
    try {
      !availableRequests.length &&
        dispatch(requestsSlice.actions.requestsLoad());
      const response = await apiClient.get<Array<Request>>('/requests');
      dispatch(requestsSlice.actions.requestsLoadSuccess(response.data));
      dispatch(fetchFeedback());
      dispatch(fetchNotifications());
    } catch (error: any) {
      dispatch(requestsSlice.actions.requestsLoadError(error.message));
    }
  };
