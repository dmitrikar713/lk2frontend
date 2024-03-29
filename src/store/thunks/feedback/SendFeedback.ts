import {
  feedbackSlice,
  SendFeedback,
} from '../../../pages/Requests/Request/new/modals/Feedback/FeedbackSlice';
import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import Toast from 'src/components/Toast';

export const sendFeedback =
  (feedback: SendFeedback): AppThunk =>
  async (dispatch) => {
    try {
      await apiClient.post<SendFeedback>('/notifications/feedback', feedback);
      dispatch(feedbackSlice.actions.feedbackClearState());
      dispatch(feedbackSlice.actions.feedbackHide(false));
      dispatch(feedbackSlice.actions.setSending(false));
      Toast('Благодарим за обратную связь!', {
        type: 'success',
      });
    } catch (error: any) {
      let resError = '';
      if (error.response && error.response.data)
        resError = error.response.data.message;
      else resError = error;
      dispatch(feedbackSlice.actions.feedbackLoadError(resError));
      Toast(resError, {
        type: 'error',
      });
    }
  };
