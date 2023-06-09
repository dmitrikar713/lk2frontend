import { apiClient } from 'src/api/client/ApiClient';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchPrintedVersionWithStamp =
  (printableData: any): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.post<Blob>(
        '/request/stamp',
        printableData,
        {
          responseType: 'arraybuffer',
        }
      );
      dispatch(requestSlice.actions.setPrintedVersionWithStamp(response.data));
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
