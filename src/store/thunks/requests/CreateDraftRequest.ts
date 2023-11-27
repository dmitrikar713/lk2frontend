import { apiClient } from 'src/api/client/ApiClient';
import {
  requestSlice,
  UploadedDocuments,
} from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const createDraftRequest =
  (draft: {
    serviceId: string;
    formData: any;
    uploadedDocuments: UploadedDocuments;
  }): AppThunk =>
  async (dispatch) => {
    try {
      console.log('createDraftRequest');
      await apiClient.post('/requests?draft=true', draft);
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
