import { apiClient } from 'src/api/client/ApiClient';
import { downloadFile } from 'src/common/utils/downloadFile';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { AppThunk } from '../../store';

export const downloadProfileDocument =
  (idDoc: string, docName: string): AppThunk =>
  async (dispatch) => {
    await apiClient
      .get<Blob>(`/docs?id=${idDoc}`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        if (response.status === 200) {
          downloadFile(docName, response.data);
        }
      })
      .catch((error: any) => {
        dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
      });
  };
