import { apiClient } from 'src/api/client/ApiClient';
import { Request, requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';
import Toast from 'src/components/Toast';
import { createDraftRequest } from 'src/store/thunks/requests/CreateDraftRequest';
import { removeAllDraft } from './RemoveDraft';

export const createRequest =
  (request: Request): AppThunk =>
  async (dispatch) => {
    try {
      const result = await apiClient.post<Request>('/requests', request);
      if (result.status === 201) {
        dispatch(removeAllDraft());
        dispatch(requestSlice.actions.setDefaultState());
        Toast('Заявка отправлена', {
          type: 'success',
        });
      }
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
      dispatch(
        createDraftRequest({
          serviceId: request.serviceId,
          formData: request.formData,
          uploadedDocuments: request.uploadedDocuments,
        })
      );
      Toast('Заявка не отправлена', {
        type: 'error',
      });
    }
  };
