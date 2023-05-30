import { apiClient } from 'src/api/client/ApiClient';
import { Services, servicesSlice } from 'src/pages/Services/ServicesSlice';
import { AppThunk } from '../../store';

export const fetchServices = (): AppThunk => async (dispatch) => {
  try {
    dispatch(servicesSlice.actions.servicesLoad());
    const response = await apiClient.get<Services>('/services');
    dispatch(servicesSlice.actions.servicesLoadSuccess(response.data));
  } catch (error: any) {
    dispatch(servicesSlice.actions.servicesLoadError(error.message));
  }
};
