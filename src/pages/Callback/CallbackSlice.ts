import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallbackState {
  error: string;
  pageBack: string;
  correntToken: boolean;
}

const initialState: CallbackState = {
  error: '',
  pageBack: '',
  correntToken: false,
};

export const callbackSlice = createSlice({
  name: 'callback',
  initialState,
  reducers: {
    callbackLoadError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    goBack(state, action: PayloadAction<string>) {
      state.pageBack = action.payload;
    },
    setToken(state, action: PayloadAction<boolean>) {
      state.correntToken = action.payload;
    },
  },
});

export default callbackSlice.reducer;
