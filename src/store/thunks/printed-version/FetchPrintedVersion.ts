import { apiClient } from 'src/api/client/ApiClient';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';
import { PrintableData } from 'src/entities/Subjects';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchPrintedVersion =
  (
    url: string,
    printableData: PrintableData,
    idFile: string,
    filename: string,
    docxTemplateUrl: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await apiClient.post<Blob>(
        url,
        { requestData: printableData, docxTemplateUrl },
        {
          responseType: 'arraybuffer',
        }
      );
      dispatch(
        requestSlice.actions.setDocument(
          await setDocumentProfile(idFile, new File([response.data], filename))
        )
      );
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
