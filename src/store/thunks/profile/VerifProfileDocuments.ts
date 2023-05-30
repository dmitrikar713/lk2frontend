import { apiClient } from 'src/api/client/ApiClient';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import { DocumentsProfile } from 'src/entities/Subjects';

export const verifDocs =
  (idDoc: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.post<DocumentsProfile[]>(
        `/docs/verif?id=${idDoc}`,
        {}
      );
      dispatch(profileSlice.actions.setDocuments(response.data));
    } catch (error: any) {
      dispatch(profileSlice.actions.profileLoadError(error.message));
    }
  };
