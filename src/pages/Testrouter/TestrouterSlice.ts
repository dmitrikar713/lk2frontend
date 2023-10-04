import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type TestrouterQuestion = {
//   qType: 'bullet' | 'select' | 'text';
//   title: string;
//   options?: string[];
//   answer?: string;
// };

// type CondQuestionGroup = {
//   title: string;
//   questions: TestrouterQuestion[];
// };

// interface TestrouterState {
//   stage: 'form' | 'survey' | 'end';
//   form: {
//     email: string;
//     region: string;
//     fullOrgName: string;
//     ogrn: string;
//     inn: string;
//     representativeFullName: string;
//     representativePosition: string;
//     representativeEmail: string;
//     representativePhone: string;
//   };
//   survey: CondQuestionGroup[];
//   activeGroup: number;
// }

const initialState: any = {
  stage: 'form',
  form: {
    email: '',
    region: 'Москва',
    regionOptions: ['Москва', 'Питер'],
    fullOrgName: '',
    ogrn: '',
    inn: '',
    representativeFullName: 'asdasd',
    representativePosition: 'qweqwe',
    representativeEmail: '',
    representativePhone: '',
  },

  survey: [
    {
      title: 'Согласны ли Вы с утверждением? (выберите да или нет)',
      questions: [
        {
          qType: 'bullet',
          title:
            'Компания готова вывозить товар за территорию страны до момента сделки',
          options: ['asd', 'qwe', 'rwther', 'dg5g'],
          answer: 'asd',
        },
        {
          qType: 'select',
          title: 'Select question',
          options: ['asd', 'qwe', 'rwther', 'dg5g'],
          answer: 'asd',
        },
        { qType: 'text', title: 'string' },
      ],
    },
    {
      title: 'Group title 2',
      questions: [
        {
          qType: 'bullet',
          title: 'string',
          options: ['asd', 'qwe', 'rwther', 'dg5g'],
          answer: 'asd',
        },
        {
          qType: 'bullet',
          title: 'string',
          options: ['asd', 'qwe', 'rwther', 'dg5g'],
          answer: 'asd',
        },
      ],
    },
  ],
  activeGroup: 0,
};

// export const TestrouterSlice = createSlice({
//   name: 'TestrouterSlice',
//   initialState,
//   reducers: {
//     setAnswer(state, action: any) {
//       console.log('asd');
//       // state[action.questGrpId].questions[action.questId].answer =
//       //   action.payload;
//     },
//   },
// });

// export default TestrouterSlice.reducer;

export const TestrouterSlice = createSlice({
  name: 'Testrouter',
  initialState,
  reducers: {
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
      console.log('setFormFieldValue');
      state.form[action.payload.fieldName] = action.payload.valuee;
      console.log('action.payload');
      console.log(action.payload);
    },
    fetchQuestions: (state, action) => {
      console.log('fetchQuestions');
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

export default TestrouterSlice.reducer;
