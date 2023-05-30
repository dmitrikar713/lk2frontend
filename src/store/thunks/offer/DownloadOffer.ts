import { apiClient } from 'src/api/client/ApiClient';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const downloadOffer = (): AppThunk => async (dispatch) => {
  try {
    const response = await apiClient.get<Blob>(`/docs/offer`, {
      responseType: 'arraybuffer',
    });
    dispatch(requestSlice.actions.setFileConfirm(response.data));
  } catch (error: any) {
    dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
  }
};
