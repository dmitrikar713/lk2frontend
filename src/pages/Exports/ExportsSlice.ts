import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExportsQuestion = {
  qType: 'bullet' | 'select' | 'text';
  title: string;
  options?: ExportQuestionOption[];
  answerIndex: number;
};
export type ExportQuestionOption = {
  name: string;
  index: number;
};

interface ExportsState {
  isLoading: boolean;
  questions: ExportsQuestion[];
  currentQuestionIndex: number;
  error: string;
}

const initialState: ExportsState = {
  isLoading: false,
  error: '',
  currentQuestionIndex: 1,
  questions: [],
};

export const exportsSlice = createSlice({
  name: 'exports',
  initialState: initialState,
  reducers: {
    exportsLoad: (state) => {
      state.isLoading = true;
    },
    exportsLoadSuccess: (state, action) => {
      state.error = '';
      state.currentQuestionIndex = 0;
      const parsed: ExportsQuestion[] = [];
      action.payload.forEach((question) => {
        parsed.push({
          ...question,
          answerIndex: 0,
          qType: 'bullet',
        });
      });
      state.questions = parsed;
      state.isLoading = false;
    },
    exportsLoadError: (state, action) => {
      state.error = action.payload;
    },
    setAnswerIndex: (state, action) => {
      state.questions[action.payload.questionId].answerIndex =
        action.payload.answer;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
  },
});

export default exportsSlice.reducer;
