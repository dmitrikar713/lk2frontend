import { apiClient } from 'src/api/client/ApiClient';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchPrintedVersionWithStamp =
  (printableData: any, docxTemplateUrl: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.post<Blob>(
        '/request/stamp',
        { requestData: printableData, docxTemplateUrl },
        {
          responseType: 'arraybuffer',
        }
      );
      dispatch(requestSlice.actions.setPrintedVersionWithStamp(response.data));
      dispatch(requestSlice.actions.requestLoaded());
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
