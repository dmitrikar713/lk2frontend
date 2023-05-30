import {
  feedbackSlice,
  FeedBack,
} from '../../../pages/Requests/Request/new/modals/Feedback/FeedbackSlice';
import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';

export const fetchFeedback = (): AppThunk => async (dispatch) => {
  try {
    dispatch(feedbackSlice.actions.feedbackLoad());
    const response = await apiClient.get<FeedBack>('/notifications/feedback');
    if (response.data && response.data.type)
      dispatch(feedbackSlice.actions.feedbackLoadSuccess(response.data));
  } catch (error: any) {
    dispatch(feedbackSlice.actions.feedbackLoadError(error.message));
  }
};
