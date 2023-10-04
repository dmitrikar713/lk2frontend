import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from './Service/ServiceSlice';

export type Services = Array<Pick<Service, 'id' | 'name'>>;

interface ServicesState {
  services: any[];
  isLoading: boolean;
  error: string;
}

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  error: '',
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    servicesLoad(state) {
      state.isLoading = true;
    },
    servicesLoadSuccess(state, action: PayloadAction<any>) {
      console.log('servicesLoadSuccess pay.act');
      console.log(action.payload);
      state.isLoading = false;
      state.error = '';
      state.services = action.payload.result.Product;
    },
    servicesLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default servicesSlice.reducer;
