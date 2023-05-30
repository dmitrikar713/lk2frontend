import { apiClient } from 'src/api/client/ApiClient';
import { StatusCode } from 'src/api/StatusCode';
import { ErrorNames } from 'src/entities/ErrorNames';
import { DocumentsProfile } from 'src/entities/Subjects';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { AppThunk } from '../../store';

export const updateProfileDocument =
  (file: File, docType: string): AppThunk =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file, encodeURI(file.name));
    await apiClient
      .post<DocumentsProfile[]>(`/docs?doctype=${docType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch(profileSlice.actions.setDocuments(response.data));
      })
      .catch((error: any) => {
        if (error.response.status === StatusCode.PayloadTooLarge) {
          dispatch(
            uploadProfileFileSlice.actions.uploadErrorFile(
              ErrorNames.LargeFileSize5Mb
            )
          );
        } else {
          dispatch(
            uploadProfileFileSlice.actions.uploadErrorFile(error.message)
          );
        }
      });
  };
