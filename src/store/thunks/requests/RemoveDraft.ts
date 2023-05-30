import { StatusCode } from 'src/api/StatusCode';
import { apiClient } from 'src/api/client/ApiClient';
import { requestsSlice } from 'src/pages/Requests/RequestsSlice';
import { AppThunk } from '../../store';

export const removeDraft =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await apiClient.post<void>(`/requests/delete?id=${id}`);
      if (result.status == StatusCode.Created) {
        dispatch(requestsSlice.actions.requestsRemoveOne(id));
      } else {
        dispatch(requestsSlice.actions.requestsLoadError(result.statusText));
      }
    } catch (error: any) {
      dispatch(requestsSlice.actions.requestsLoadError(error.message));
    }
  };

export const removeAllDraft = (): AppThunk => async (dispatch) => {
  try {
    const result = await apiClient.post<void>('/requests/removealldraft');
    if (result.status == StatusCode.Created || result.status == StatusCode.OK) {
      dispatch(requestsSlice.actions.requestsRemoveAllDrafts());
    } else {
      dispatch(requestsSlice.actions.requestsLoadError(result.statusText));
    }
  } catch (error: any) {
    dispatch(requestsSlice.actions.requestsLoadError(error.message));
  }
};
