import { apiClient } from 'src/api/client/ApiClient';
import { AppThunk } from '../../store';
import { testrouterSlice } from 'src/pages/Testrouter/TestrouterSlice';

export const sendTestrouterAnswers =
  (questions): AppThunk =>
  async (dispatch) => {
    try {
      console.log('sendTestrouterAnswers');
      console.log(questions);
      const spreadQuestions = [];
      questions.forEach((group) => {
        spreadQuestions.push(...group.questions);
      });
      const response = await apiClient.post(
        '/testrouter/sendAnswers',
        spreadQuestions
      );
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
