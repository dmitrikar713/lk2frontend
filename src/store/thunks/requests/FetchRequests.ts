import { apiClient } from 'src/api/client/ApiClient';
import { Request, requestsSlice } from 'src/pages/Requests/RequestsSlice';
import { AppThunk } from '../../store';
import { fetchNotifications } from '../notifications/FetchNotifications';
import { fetchFeedback } from 'src/store/thunks/feedback/FetchFeedback';

export const fetchRequests =
  (availableRequests: Request[]): AppThunk =>
  async (dispatch) => {
    try {
      console.log('fetchRequests');
      if (!availableRequests.length) {
        dispatch(requestsSlice.actions.requestsLoad());
      }
      // const response = await apiClient.get<Array<Request>>('/requests');
      // todo разкомментить
      const response = await apiClient.get<Array<any>>('/requests');
      console.log('fetchRequests response:');
      console.log(response);
      dispatch(requestsSlice.actions.requestsLoadSuccess(response.data));
      dispatch(fetchFeedback());
      dispatch(fetchNotifications());
    } catch (error: any) {
      dispatch(requestsSlice.actions.requestsLoadError(error.message));
    }
  };
