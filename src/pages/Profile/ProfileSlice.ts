import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { DocumentStatuses } from 'src/entities/Statuses';
import { Organization, User, DocumentsProfile } from 'src/entities/Subjects';

export interface Profile {
  onboarding: boolean | null;
  logo: string;
  user: User;
  organization: Organization;
  documents: DocumentsProfile[];
}

export interface Signature {
  signature: string;
}
interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  error: string;
}

const initialState: ProfileState = {
  profile: {
    onboarding: null,
    logo: '',
    user: {
      user_id: '',
      user_last_name: '',
      user_first_name: '',
      user_middle_name: '',
      user_phone: '',
      user_email: '',
      user_post: '',
    },
    organization: {
      org_id: '',
      org_type: 'company',
      org_name: '',
      org_name_short: '',
      org_organization_form: '',
      org_OGRN: '',
      org_CPP: '',
      org_address: '',
      org_address_legal: '',
      org_email: '',
      org_phone: '',
      org_site: '',
      org_OKVED: '',
      org_OCPO: null,
      org_exports_market: '',
      org_exports_amount: '',
      org_inn: '',
    },
    documents: [],
  },
  isLoading: false,
  error: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileLoad(state) {
      state.isLoading = true;
    },
    profileLoadSuccess(state, action: PayloadAction<Profile>) {
      state.isLoading = false;
      state.error = '';
      state.profile = {
        ...action.payload,
        onboarding:
          state.profile.onboarding === null
            ? action.payload.onboarding
            : state.profile.onboarding,
      };
    },
    profileLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    setDocuments(state, action: PayloadAction<DocumentsProfile[]>) {
      state.profile.documents = action.payload;
    },
  },
});

export default profileSlice.reducer;
