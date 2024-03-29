import { apiClient } from 'src/api/client/ApiClient';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';
import { PrintableData } from 'src/entities/Subjects';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchPrintedVersion =
  (
    url: string,
    printableData: any,
    // printableData: PrintableData,
    idFile: string,
    filename: string,
    docxTemplateUrl: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.post<Blob>(
        url,
        { requestData: printableData, docxTemplateUrl },
        {
          responseType: 'arraybuffer',
        }
      );
      console.log('fetchPrintedVersion');
      console.log(idFile);
      console.log(response.data);
      dispatch(
        requestSlice.actions.setDocument(
          await setDocumentProfile(idFile, new File([response.data], filename))
        )
      );
      dispatch(requestSlice.actions.requestLoaded());
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
