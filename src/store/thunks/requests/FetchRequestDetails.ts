import { apiClient } from 'src/api/client/ApiClient';
import { detailsSlice } from 'src/pages/Requests/Request/details/DetailsSlice';
import { AppThunk } from '../../store';

export const fetchRequestDetails =
  (requestId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(detailsSlice.actions.requestDetailsLoad());
      const response = await apiClient.get(`/request/rpp?id=${requestId}`);
      dispatch(
        detailsSlice.actions.requestDetailsFieldsLoadSuccess(
          response.data.fields
        )
      );
      dispatch(
        detailsSlice.actions.requestDetailsValueLoadSuccess(response.data.value)
      );
    } catch (error: any) {
      dispatch(detailsSlice.actions.requestDetailsLoadError(error.message));
    }
  };
