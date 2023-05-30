import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum feedbackType {
  contract = 'ContractFeedback',
  noContract = 'ServiceFeedback ',
}

export interface SendFeedback {
  serviceStar: number;
  workStar: number;
  MECStar: number;
  feedback: string;
  country: string;
  buyer: string;
  accountId: string;
  leadId: string;
  activityId: string;
  contractNumber: string;
  contractDate: string;
  contractSumm: number;
  contractItem: string;
  contractWith: string;
}

export interface FeedBack {
  accountId: string;
  leadId: string;
  type: feedbackType;
  activityId: string;
  leadName: string;
  leadNumber: string;
}
interface FeedbackState {
  accountId: string;
  leadId: string;
  activityId: string;
  feedbackShown: boolean;
  feedbackContract: boolean;
  isLoading: boolean;
  error: string;
  leadName: string;
  leadNumber: string;
}

const initialState: FeedbackState = {
  activityId: '',
  accountId: '',
  leadId: '',
  feedbackShown: false,
  feedbackContract: false,
  isLoading: false,
  error: '',
  leadName: '',
  leadNumber: '',
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    feedbackLoad(state) {
      state.isLoading = true;
    },
    feedbackHide(state, action: PayloadAction<boolean>) {
      state.feedbackShown = action.payload;
    },

    feedbackLoadSuccess(state, action: PayloadAction<FeedBack>) {
      if (action.payload.leadId != '') {
        state.isLoading = false;
        state.error = '';
        state.accountId = action.payload.accountId;
        state.leadId = action.payload.leadId;
        state.activityId = action.payload.activityId;
        state.leadName = action.payload.leadName;
        state.leadNumber = action.payload.leadNumber;
        state.feedbackShown = true;
        action.payload.type == feedbackType.contract
          ? (state.feedbackContract = true)
          : (state.feedbackContract = false);
      }
    },
    feedbackClearState(state, action: PayloadAction<void>) {
      return initialState;
    },
    feedbackLoadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default feedbackSlice.reducer;
