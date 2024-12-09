import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, quizInitialState } from "./quizType";

interface QuizzesState {
    quizzes: Quiz[];
    currentQuiz: Quiz | null;
    loading: boolean;
    error: string | null;
}

const initialState: QuizzesState = {
    quizzes: [],
    currentQuiz: null,
    loading: false,
    error: null,
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
            state.currentQuiz = action.payload;
        },

        deleteQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
        },

        setQuizzes: (state, { payload: quizzes }: PayloadAction<Quiz[]>) => {
            state.quizzes = quizzes;
        },

        // 开始加载
        startLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        // 加载成功
        finishLoading: (state) => {
            state.loading = false;
        },

        // 设置错误
        setError: (state, { payload: error }: PayloadAction<string>) => {
            state.error = error;
            state.loading = false;
        },
    },
});

export const {
    deleteQuiz,
    setQuizzes,
    startLoading,
    finishLoading,
    setError,
    setCurrentQuiz
} = quizzesSlice.actions;

export default quizzesSlice.reducer;