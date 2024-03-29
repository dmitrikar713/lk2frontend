import { DocumentStatuses } from 'src/entities/Statuses';
import {
  UploadedDocuments,
  DocumentPayload,
} from 'src/pages/Requests/Request/RequestSlice';
import { fileToBase64 } from './fileToBase64';

export const setDocumentProfile = async (
  key: keyof UploadedDocuments,
  file: File | null,
  uploadedAt?: string,
  title?: string
) => {
  const documentData: DocumentPayload = {
    key,
    document: {
      file: file ? ((await fileToBase64(file)) as string) : null,
      status: DocumentStatuses.Empty,
      uploadedAt: uploadedAt || '',
      fileName: file ? file.name : '',
      title: title ? title : '',
      type: file ? file.name.substring(file.name.lastIndexOf('.') + 1) : '',
    },
  };
  return documentData;
};
