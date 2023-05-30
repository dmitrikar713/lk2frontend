import { apiClient } from 'src/api/client/ApiClient';
import { StatusCode } from 'src/api/StatusCode';
import { fileToBase64 } from 'src/common/utils/fileToBase64';
import { ErrorNames } from 'src/entities/ErrorNames';
import { Profile, profileSlice } from 'src/pages/Profile/ProfileSlice';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { AppThunk } from '../../store';

export const updateProfileLogo =
  (fList: FileList, profile: Profile): AppThunk =>
  async (dispatch) => {
    const base64Logo = await fileToBase64(fList[0]);
    const formData = new FormData();
    formData.append('file', fList[0]);
    await apiClient
      .post<FormData>('/profile/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        dispatch(uploadProfileFileSlice.actions.uploadErrorFile(''));
        dispatch(
          profileSlice.actions.setProfile({
            ...profile,
            logo: base64Logo as string,
          })
        );
      })
      .catch((error: any) => {
        if (error.response.status === StatusCode.PayloadTooLarge) {
          dispatch(
            uploadProfileFileSlice.actions.uploadErrorFile(
              ErrorNames.LargeFileSize256Kb
            )
          );
        } else {
          dispatch(
            uploadProfileFileSlice.actions.uploadErrorFile(error.message)
          );
        }
      });
  };
