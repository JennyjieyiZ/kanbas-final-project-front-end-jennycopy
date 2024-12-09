import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignment/reducer";
import enrollmentReducer from "./enrollmentReducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Quizzes/FacultyController/Questions/reducer";
const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        enrollmentReducer,
        quizzesReducer,
        questionReducer
    },
});
export default store;