import { apiClient } from 'src/api/client/ApiClient';
import { Profile, profileSlice } from 'src/pages/Profile/ProfileSlice';
import { AppThunk } from '../../store';
import Toast from 'src/components/Toast';

export interface CompanySettings {
  statusChanges: boolean;
  feedback: boolean;
  signAct: boolean;
  additionalDocs: boolean;
}

export const updateSettings =
  (settings: CompanySettings): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiClient.post<Profile>('/profile/settings', settings);
      Toast('Настройки успешно обновлены', {
        type: 'success',
      });
    } catch (error: any) {
      Toast(error, {
        type: 'error',
      });
    }
  };
