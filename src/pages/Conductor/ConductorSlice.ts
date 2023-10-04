import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type ConductorQuestion = {
//   qType: 'bullet' | 'select' | 'text';
//   title: string;
//   options?: string[];
//   answer?: string;
// };

// type CondQuestionGroup = {
//   title: string;
//   questions: ConductorQuestion[];
// };

// interface ConductorState {
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
  stage: 'survey',
  form: {
    email: '',
    region: '',
    fullOrgName: '',
    ogrn: '',
    inn: '',
    representativeFullName: '',
    representativePosition: '',
    representativeEmail: '',
    representativePhone: '',
  },

  survey: [
    {
      title: 'Group title 1',
      questions: [
        {
          qType: 'bullet',
          title: 'questTitle1',
          options: ['asd', 'qwe', 'rwther', 'dg5g'],
          answer: 'asd',
        },
        {
          qType: 'select',
          title: 'questTitle2',
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
  activeGroup: 1,
};

// export const conductorSlice = createSlice({
//   name: 'conductorSlice',
//   initialState,
//   reducers: {
//     setAnswer(state, action: any) {
//       console.log('asd');
//       // state[action.questGrpId].questions[action.questId].answer =
//       //   action.payload;
//     },
//   },
// });

// export default conductorSlice.reducer;

export const conductorSlice = createSlice({
  name: 'conductor',
  initialState,
  reducers: {
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

export default conductorSlice.reducer;
