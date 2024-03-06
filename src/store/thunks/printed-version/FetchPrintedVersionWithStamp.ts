import { apiClient } from 'src/api/client/ApiClient';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';
import { PrintableData } from 'src/entities/Subjects';
import { uploadProfileFileSlice } from 'src/pages/Profile/UploadProfileFileSlice';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';
import { DocumentStatuses } from 'src/entities/Statuses';
import { fileToBase64 } from 'src/common/utils/fileToBase64';

export const fetchPrintedVersionWithStamp =
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
      const file = new File([response.data], filename);
      const document = {
        key: idFile,
        document: {
          file: file ? ((await fileToBase64(file)) as string) : null,
          status: DocumentStatuses.Signed,
          uploadedAt: '',
          fileName: file ? file.name : '',
          title: '',
          type: file ? file.name.substring(file.name.lastIndexOf('.') + 1) : '',
        },
      };

      dispatch(requestSlice.actions.setDocument(document));
      dispatch(requestSlice.actions.requestLoaded());
    } catch (error: any) {
      dispatch(uploadProfileFileSlice.actions.uploadErrorFile(error.message));
    }
  };
