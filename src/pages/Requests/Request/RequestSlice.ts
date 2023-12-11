import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StringObject } from 'src/entities/BaseTypes';
import { FormData, FormFieldParameters } from 'src/entities/Forms';
import { DocumentStatuses } from 'src/entities/Statuses';
import { RequestStages } from 'src/entities/Subjects';

export interface UploadedDocument {
  // todo File возможно должен быть способен быть типом Файл
  file: string | null;
  status: DocumentStatuses;
  uploadedAt: string;
  signature?: string | null;
  fileName: string;
  title?: string;
  url?: string;
  type: string;
  comment?: string;
}

export interface UploadedDocuments {
  [name: string]: UploadedDocument;
}

export interface DocumentPayload {
  key: keyof UploadedDocuments;
  document: UploadedDocument;
}

// const serviceConfigExample = {
//   fields: [{
//     name: string;
//     type?: string;
//     description: string | null;
//     parameterInApi: string;
//     fieldType: {
//       id: number;
//       name: string;
//       code: number | null;
//       dictionaries: Array<{
//         id: string;
//         name: string;
//         code: number | null;
//         dictionaries: [];
//       }>;
//     };
//     required: boolean;
//     signatureRequired: boolean;
//     inner: boolean;
//     url: string | null;
//     signatures: [];
//     maxSignaturesCount: number | null;
//     digitalStorageType: {
//       name: string;
//       outerId: number | null;
//       outerName: string | null;
//       fileFormats: string | null;
//       fileSizeMaxByte: number;
//     };
//     visibility: boolean;
//     isUserFill: boolean;
//     readOnly: boolean;
//     measureServiceParamValueGroup: number | null;
//     stage: {
//       order: number;
//       name: string;
//       description: string;
//       group: string | null;
//     };
//     inputMask: string | null;
//   }];
//   dictionary: FormData;
// }

interface FormConfig {
  fields: Array<FormFieldParameters>;
  dictionary: FormData;
}

export interface RequestAction {
  requestId: string;
  actionId: string;
  currentStage: string;
  [key: string]: string | FileSignature | boolean;
}

export interface FileSignature {
  file: string;
  signature: string;
  fileName: string;
  title?: string;
}
export interface Request {
  id: string;
  serviceId: string;
  serviceName: string;
  formConfig: FormConfig;
  formData: FormData;
  uploadedDocuments: UploadedDocuments;
  number?: string;
  createdAt?: string;
  statusId: string;
  statusName?: string;
  stages: RequestStages[];
  actions: Actions[];
  formSelectsValue: Array<any>;
}

interface Actions {
  actionId: string;
  active: boolean;
  name: string;
}
interface RequestState {
  request: Request;
  isLoading: boolean;
  error: string;
  fileConfirm: Blob;
  printedVersionWithStamp: Blob;
  draft: StringObject;
}
interface DocTypeForm {
  parameterInApi: string;
  file: FormFile;
}
interface FormFile {
  name: string;
  type: string;
}

const initialState: RequestState = {
  request: {
    id: '',
    // эл торг
    // serviceId: '094d5ad7669c41e19a03b103684cff74',
    serviceId: null,
    // serviceId: 'bb198aa6c22340679afff9ee5b67deef',
    serviceName: null,
    formConfig: { fields: [], dictionary: {} },
    formData: {},
    statusId: '',
    uploadedDocuments: {},
    stages: [],
    actions: [],
    formSelectsValue: [],
  },
  isLoading: false,
  error: '',
  fileConfirm: new Blob([]),
  printedVersionWithStamp: new Blob([]),
  draft: {},
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setServiceName(state, action: PayloadAction<string>) {
      console.log('setServiceName:');
      console.log(action.payload);

      state.request.serviceName = action.payload;
    },
    setServiceId(state, action: PayloadAction<string>) {
      state.request.serviceId = action.payload;
    },
    requestLoad(state) {
      state.isLoading = true;
    },
    requestLoaded(state) {
      state.isLoading = false;
    },
    requestLoadSuccess(state, action: PayloadAction<Request>) {
      state.isLoading = false;
      state.error = '';
      state.request = action.payload;
    },
    requestLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setDefaultState(state) {
      state.request = initialState.request;
    },
    setFormConfig(state, action) {
      state.request.formConfig = action.payload;
      state.isLoading = false;
    },
    setRequest(state, action: PayloadAction<Request>) {
      state.request = action.payload;
    },
    setDraft(state, action: PayloadAction<StringObject>) {
      state.draft = action.payload;
    },
    setFormSelectsValue(state, action: PayloadAction<Array<any>>) {
      state.request.formSelectsValue = action.payload;
    },
    setFormDocType(state, action: PayloadAction<DocTypeForm>) {
      state.request.formConfig.fields.map((field) => {
        if (field.parameterInApi === action.payload.parameterInApi) {
          const { name } = action.payload.file;
          field.type = name.substring(name.lastIndexOf('.') + 1);
        }
      });
    },
    setDocument(state, action: PayloadAction<DocumentPayload>) {
      state.request.uploadedDocuments[action.payload.key] =
        action.payload.document;
    },
    setFileConfirm(state, action: PayloadAction<Blob>) {
      state.fileConfirm = action.payload;
    },
    setPrintedVersionWithStamp(state, action: PayloadAction<Blob>) {
      state.printedVersionWithStamp = action.payload;
    },
  },
});

export default requestSlice.reducer;
