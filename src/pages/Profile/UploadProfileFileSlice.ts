import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadProfileFileState {
  loadingError: string;
}

const initialState: UploadProfileFileState = {
  loadingError: '',
};

export const uploadProfileFileSlice = createSlice({
  name: 'uploadErrorFile',
  initialState,
  reducers: {
    uploadErrorFile(state, action: PayloadAction<string>) {
      state.loadingError = action.payload;
    },
  },
});

export default uploadProfileFileSlice.reducer;
