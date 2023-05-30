import { apiClient } from 'src/api/client/ApiClient';
import { Service, serviceSlice } from 'src/pages/Services/Service/ServiceSlice';
import { AppThunk } from '../../store';

export const fetchService =
  (serviceId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(serviceSlice.actions.serviceLoad());
      const response = await apiClient.get<Service>(`/services/${serviceId}`);
      dispatch(serviceSlice.actions.serviceLoadSuccess(response.data));
    } catch (error: any) {
      dispatch(serviceSlice.actions.serviceLoadError(error.message));
    }
  };
