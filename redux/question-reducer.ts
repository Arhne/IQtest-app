import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubCategories } from '@/data/enum';


interface SubCategoryProgress {
  answered: number;
  total: number;
}


interface InitialStateType {
  progressData: Record<SubCategories, SubCategoryProgress>;
  recentData: Record<SubCategories, AnsweredDetails>;
  // currentQuestionIndex: number;
  answer: QuestionDetails | undefined;
  isLoading: boolean;
}

const initialState: InitialStateType = {
  progressData: {} as Record<SubCategories, SubCategoryProgress>,
  recentData: {} as Record<SubCategories, AnsweredDetails>,
  // currentQuestionIndex: 0,
  answer: undefined,
  isLoading: true, // Add loading state
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setProgressData: (
      state,
      action: PayloadAction<Record<SubCategories, SubCategoryProgress>>
    ) => {
      state.progressData = action.payload;
    },
    updateProgress(state, action) {
      const { subCategoryId, updatedProgress } = action.payload;
      state.progressData[subCategoryId as SubCategories] = updatedProgress;
    },
    updateRecentData(state, action) {
      state.recentData = action.payload;
    },
    setRecentData: (
      state,
      action: PayloadAction<Record<SubCategories, AnsweredDetails>>
    ) => {
      state.recentData = action.payload;
    },
    setAnswer: (state, action: PayloadAction<QuestionDetails | undefined>) => {
      state.answer = action.payload;
    },
    resetAnswer: (state) => {
      state.answer = undefined;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setProgressData,
  setRecentData,
  setAnswer,
  resetAnswer,
  setIsLoading,
  updateProgress,
  updateRecentData
} = questionSlice.actions;

export default questionSlice.reducer;
