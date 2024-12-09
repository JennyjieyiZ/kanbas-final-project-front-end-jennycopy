import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, questionInitialState } from "../../questionType";

interface QuestionsState {
    questions: Question[];
}

const initialState: QuestionsState = {
    questions: [], // 初始状态为空数组
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        // 添加新问题
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.questions.push(action.payload);
        },
        // 删除问题
        handleDeleteQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter((q) => q._id !== action.payload);
        },
        // 设置问题 (用于初始化)
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
    },
});

export const { addQuestion, handleDeleteQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;