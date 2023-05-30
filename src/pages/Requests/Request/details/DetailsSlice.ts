import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StringObject } from 'src/entities/BaseTypes';
import { FormFieldParameters } from 'src/entities/Forms';

interface DetailsState {
  fields: Array<FormFieldParameters>;
  value: StringObject;
  isLoading: boolean;
  error: string;
}

const initialState: DetailsState = {
  fields: [],
  value: {},
  isLoading: false,
  error: '',
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    requestDetailsLoad(state) {
      state.isLoading = true;
    },
    requestDetailsFieldsLoadSuccess(
      state,
      action: PayloadAction<Array<FormFieldParameters>>
    ) {
      state.isLoading = false;
      state.error = '';
      state.fields = action.payload;
    },
    requestDetailsValueLoadSuccess(state, action: PayloadAction<StringObject>) {
      state.isLoading = false;
      state.error = '';
      state.value = action.payload;
    },
    requestDetailsLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailsSlice.reducer;
