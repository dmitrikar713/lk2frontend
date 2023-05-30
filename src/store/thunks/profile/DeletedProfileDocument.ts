import { apiClient } from 'src/api/client/ApiClient';
import { DocumentsProfile } from 'src/entities/Subjects';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { AppThunk } from '../../store';

export const deletedProfileDocument =
  (idDoc: string): AppThunk =>
  async (dispatch) => {
    await apiClient
      .delete<DocumentsProfile[]>(`/docs?id=${idDoc}`)
      .then((response) => {
        dispatch(profileSlice.actions.setDocuments(response.data));
      })
      .catch((error: any) => {
        dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
      });
  };
