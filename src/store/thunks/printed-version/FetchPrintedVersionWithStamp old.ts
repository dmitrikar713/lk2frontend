import { apiClient } from 'src/api/client/ApiClient';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';
import { fileToBase64 } from 'src/common/utils/fileToBase64';

export const fetchPrintedVersionWithStamp =
  (printableData: any, docxTemplateUrl: string, fieldId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      console.log(JSON.stringify(printableData, null, 4));
      console.log(docxTemplateUrl);
      const response = await apiClient.post<Blob>(
        '/request/stamp',
        { requestData: printableData, docxTemplateUrl },
        {
          responseType: 'arraybuffer',
        }
      );
      console.log('fetchPrintedVersionWithStamp');
      console.log(response.data);
      const filee: any = await fileToBase64(
        new File([response.data], 'Печатная форма заявки PDF')
      );
      dispatch(
        requestSlice.actions.setPrintedVersionWithStamp({
          file: filee,
          fieldId: fieldId,
        })
      );
      dispatch(requestSlice.actions.requestLoaded());
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
