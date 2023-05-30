import { apiClient } from 'src/api/client/ApiClient';
import { downloadFile } from 'src/common/utils/downloadFile';
import { ErrorNames } from 'src/entities/ErrorNames';
import { PrintableData } from 'src/entities/Subjects';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { AppThunk } from '../../store';

export const downloadPrintedVersion =
  (printableData: PrintableData): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.post<Blob>(
        '/request/pdf-print-form',
        printableData,
        {
          responseType: 'arraybuffer',
        }
      );
      downloadFile('Печатная форма заявки', response.data);
    } catch (error: any) {
      dispatch(
        uploadProfileFileSlice.actions.uploadErrorFile(
          ErrorNames.PrintedVersion
        )
      );
    }
  };
