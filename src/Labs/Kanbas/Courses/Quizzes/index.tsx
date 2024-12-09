import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import QuizAddNewEditor from "./FacultyController/QuizAddNewEditor";
import FacultyReviewQuizDetails from "./FacultyReviewDetails";
import QuizEditor from "./FacultyController/QuizEdiotr";
import QuestionEditorIndex from "./FacultyController/Questions/QuestionEditorIndex";
import { Quiz } from "./quizType";
import Quizzes from "./ShowQuizList";
import ThreeQuestionEditors from "./FacultyController/Questions/QuestionUpdateEditor/ThreeQuestionEditorsIndex";
import StudentQuiz from "./Attempts/StudentQuestionIndex";
import FacultyQuizPreview from "./FacultyQuizPreview";
import ConfirmTakeQuizPage from "./Attempts/ConfirmTakeQuizPage";

export default function QuizzesRoute() {
    const { cid,qid } = useParams();
    //todo:确认下所有的cancel链接到原来的页面
    return (
        <div id="wd-quizzes-route">
            <div className="d-flex">
                <div className="flex-fill">
                    <Routes>
                        {/* 显示测验列表 */}
                        <Route path="/" element={<Quizzes />}/>

                        {/* 添加新测验 */}
                        <Route path="editor" element={<QuizAddNewEditor />} />

                        {/* 查看测验详情 */}
                        <Route path=":qid/review" element={<FacultyReviewQuizDetails />} />

                        {/* 编辑测验 */}
                        <Route path=":qid/editor" element={<QuizEditor />} />

                        {/* 测验问题总界面 */}
                        <Route path=":qid/editor/questions" element={<QuestionEditorIndex />} />
                        {/* 编辑测验问题 */}
                        <Route
                            path=":qid/editor/questions/:questionId"
                            element={<ThreeQuestionEditors />}
                        />

                        {/* 学生参加测验 */}
                        <Route
                            path=":qid/attempt/:attemptId"
                            element={<StudentQuiz />}
                        />
                        {/* 确认参加测验 */}
                        <Route
                            path=":qid/attempt"
                            element={<ConfirmTakeQuizPage />}
                        />

                        {/* 老师预览测验 */}
                        <Route
                            path=":qid/attempt/:attemptId/faculty" //todo:这个faculty最后可以删除，因为用role来控制
                            element={<FacultyQuizPreview />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}