import { apiClient } from 'src/api/client/ApiClient';
import Toast from 'src/components/Toast';
import {
  Request,
  RequestAction,
  requestSlice,
} from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const invokeRppAction =
  (request: RequestAction, message?: string): AppThunk =>
  async (dispatch) => {
    try {
      const actionResponse = await apiClient.post<Request>(
        '/requests/action',
        request
      );
      console.log(JSON.parse(JSON.stringify(actionResponse, null, 4)));
      const response = await apiClient.get<Request>(
        `/requests?id=${request.requestId}`
      );
      if (message && response && response.status == 200) {
        Toast(message, {
          type: 'success',
        });
      }
      setTimeout(
        () => dispatch(requestSlice.actions.requestLoadSuccess(response.data)),
        1000
      );
    } catch (error: any) {
      let resError = '';
      if (error.response && error.response.data) resError = error.response.data;
      else resError = error;
      Toast(resError, {
        type: 'error',
      });
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
