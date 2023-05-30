import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceStage {
  id: string;
  name: string;
}

export interface Service {
  id: string | null;
  name: string;
  infoList: Array<string>;
  stages: Array<ServiceStage>;
}

interface ServiceState {
  service: Service;
  isLoading: boolean;
  error: string;
}

const initialState: ServiceState = {
  service: {
    id: null,
    name: '',
    infoList: [],
    stages: [],
  },
  isLoading: false,
  error: '',
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    serviceLoad(state) {
      state.isLoading = true;
    },
    serviceLoadSuccess(state, action: PayloadAction<Service>) {
      state.isLoading = false;
      state.error = '';
      state.service = action.payload;
    },
    serviceLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default serviceSlice.reducer;
