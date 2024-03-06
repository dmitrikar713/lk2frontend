import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

// stage: survey form end
const initialState: any = {
  stage: 'survey',
  isLoading: true,
  error: '',
  // form: {
  //   email: '',
  //   region: 'Москва',
  //   regionOptions: ['Москва', 'Питер'],
  //   fullOrgName: '',
  //   ogrn: '',
  //   inn: '',
  //   representativeFullName: 'asdasd',
  //   representativePosition: 'qweqwe',
  //   representativeEmail: '',
  //   representativePhone: '',
  // },
  survey: [],
  activeGroup: 0,
};

export const testrouterSlice = createSlice({
  name: 'Testrouter',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action) => {
      state.error = '';
      state.activeGroup = 0;
      const initial = action.payload;
      const chunkSize = 5;
      const groups = [];
      const formattedQuestions = initial.map((q) => ({
        qType: 'bullet',
        title: q.title,
        options: q.options.map((o) => o.name),
        answer: q.options[0].name,
      }));
      for (let i = 0; i < formattedQuestions.length; i += chunkSize) {
        const chunk = formattedQuestions.slice(i, i + chunkSize);
        groups.push({
          title: '',
          questions: chunk,
        });
      }

      state.survey = groups;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setAnswer: (state, action) => {
      state.survey[action.payload.questionGroupId].questions[
        action.payload.questionId
      ].answer = action.payload.answer;
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    setFormFieldValue: (state, action) => {
      state.form[action.payload.fieldName] = action.payload.valuee;
    },
    restart: (state) => {
      state.stage = 'survey';
    },
    // profileLoad(state) {
    //   state.isLoading = true;
    // },
    // profileLoadSuccess(state, action: PayloadAction<Profile>) {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.profile = {
    //     ...action.payload,
    //     onboarding:
    //       state.profile.onboarding === null
    //         ? action.payload.onboarding
    //         : state.profile.onboarding,
    //   };
    // },
    // profileLoadError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // setProfile(state, action: PayloadAction<Profile>) {
    //   state.profile = action.payload;
    // },
    // setDocuments(state, action: PayloadAction<DocumentsProfile[]>) {
    //   state.profile.documents = action.payload;
    // },
  },
});

export default testrouterSlice.reducer;
