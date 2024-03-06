import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { testrouterSlice } from 'src/pages/Testrouter/TestrouterSlice';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';

export const sendTestrouterAnswers =
  (questions): AppThunk =>
  async (dispatch) => {
    try {
      const spreadQuestions = [];
      questions.forEach((group) => {
        spreadQuestions.push(...group.questions);
      });
      const response = await apiClient.post(
        '/testrouter/sendAnswers',
        spreadQuestions
      );
      const responseResults = await apiClient.get('/profile/testresults');
      console.log('fetchTestResults resp');
      console.log(response);
      if (response.data)
        dispatch(profileSlice.actions.setTestResults(responseResults.data));

      // qType: 'bullet',
      // title: q.title,
      // options: q.options.map((o) => o.name),
      // answer: q.options[0].name,
      console.log(response.status);
    } catch (error: any) {
      dispatch(testrouterSlice.actions.setError(error.message));
      console.log(error.message);
    }
  };
