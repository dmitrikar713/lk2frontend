import {
  UploadedDocument,
  UploadedDocuments,
} from 'src/pages/Requests/Request/RequestSlice';
import { CompanySettings } from 'src/store/thunks/profile/UpdateSettings';

export interface User {
  user_id: string;
  user_last_name: string;
  user_first_name: string;
  user_middle_name: string;
  user_phone: string;
  user_email: string;
  user_post: string;
}

export interface Company {
  org_id: string;
  org_type: 'company';
  org_name: string;
  org_name_short: string;
  org_organization_form: string;
  org_OGRN: string;
  org_CPP: string;
  org_address: string;
  org_address_legal: string;
  org_email: string;
  org_phone: string;
  org_site: string;
  org_OKVED: string;
  org_OCPO: number | null;
  org_exports_market: string;
  org_exports_amount: string;
  org_inn: string;
  settings: CompanySettings;
}

export interface IndividualEntrepreneur {
  org_id: string;
  org_type: 'ip';
  org_OGRNIP: number | null;
  org_inn: number | null;
  org_name: string;
  org_address_legal: string | null;
  org_phone: string | null;
  org_email: string | null;
  org_site: string;
  org_exports_market: string;
  org_exports_amount: string;
  settings: CompanySettings;
}

export interface Documents {
  map(arg0: (field: any) => JSX.Element): import('react').ReactNode;
  documents_charter: UploadedDocument;
  documents_financial_statement: UploadedDocument;
}

export interface DocumentsProfile {
  docName: string;
  docType: string;
  file: UploadedDocument;
  id: string;
  title: string;
  type: string;
}
export interface PrintableData {
  guid: string;
  inn: string | false;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Phone: string;
}

export interface RequestStages {
  dateClosed: string;
  dateCreated: string;
  status: string;
  substages: RequestSubstages[];
  title: string;
  stageOrder: number;
}

export interface RequestSubstages {
  closed: string;
  code: string;
  created: string;
  title: string;
  status: string;
  additionalDocs: AdditionalDocs[];
  history: UploadedDocuments;
}

interface AdditionalDocs {
  docName: string;
  docType: string;
  file: UploadedDocument;
  id: string;
  title: string;
  type: string;
}

export enum DocumentsName {
  Charter = 'Устав',
  FinancialStatement = 'Финансовая отчётность',
}

export type Organization = Company | IndividualEntrepreneur;
