import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Quiz} from "../../quizType";
import AddQuestionController from "./AddQuestionController";
import {Question} from "../../questionType";
import {deleteQuestion, getQuestionsForQuiz, getQuizById, updateQuiz} from "../../client";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {handleDeleteQuestion, setQuestions} from "./reducer";
import {setCurrentQuiz} from "../../reducer";
interface RootState {
    questionReducer: {
        questions: Question[];
    };
}


export default function QuestionEditorIndex() {
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.questionReducer.questions);
    const [quiz, setQuiz] = useState<Quiz>();//得到数据这个改成刚刚得到Quiz
    //获取对应的id
    const{cid, qid} = useParams();

    //const [questions, setQuestions] = useState<Question[]>([]);
    //todo:这个也要加reducer
    const fetchQuestions = async () => {
        try {

            if(qid){
                const fetchedQuestions =  await getQuestionsForQuiz(qid);
                console.log(fetchedQuestions);
                //setQuestions(fetchedQuestions)
                dispatch(setQuestions(fetchedQuestions));
            }

        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    const loadQuiz = async () => {
        if (qid) {
            try {
                const fetchedQuiz = await getQuizById(qid);
                dispatch(setCurrentQuiz(fetchedQuiz));
                setQuiz(fetchedQuiz);
            } catch (error) {
                console.error("Error fetching assignment:", error);
            }
        }
    };


    const handleUpdateQuiz = async () => {
        if (!quiz || !quiz._id) {
            console.error("Quiz data is invalid or missing _id");
            return;
        }
        const totalPoints = questions.reduce((sum, question) => sum + (question.points || 0), 0);;
        // 准备要更新的数据
        const updatedData = {
            ...quiz,
            questions: questions, // 只更新 questions 数组
            points: totalPoints,
        };

        try {
            console.log("updating quiz:", updatedData);
            const response = await updateQuiz(quiz._id,updatedData);
            alert("Quiz updated successfully!");
            setQuiz(response);
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    const navigate = useNavigate()
    const handleNavtoQuizzes = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`);
    }

    const handleDeleteQuestionByID = async (questionId: string) => {
        try {
            // 显示确认提示
            // const userConfirmed = window.confirm("Are you sure you want to delete this quiz?");
            // if (!userConfirmed) {
            //     return; // 用户取消删除操作
            // }

            // 调用删除逻辑
            await deleteQuestion(questionId);

            dispatch(handleDeleteQuestion(questionId));

        } catch (error) {
            console.error("Error deleting quiz:", error);
            alert("Failed to delete the quiz. Please try again.");
        }
    };


    useEffect(() => {
        if (cid && qid) {
            fetchQuestions();
            loadQuiz();
        }
    }, []);

    return (
        <div className="container mt-4">

            <h5 className="text-end ">points : {quiz?.points ?? "N/A"}</h5>
            {/* Tabs */}
            <div className="tabs">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Details
                </Link>
                <Link to=" "
                      className="tab px-3 py-2 border border-black text-dark text-decoration-none">
                    Questions
                </Link>
            </div>
            <hr className="border border-black w-100 mt-1 "/>

            <ul id="wd-questions-list" className="list-group rounded-0">
                {questions.map((question: Question) => (
                    <li key={question._id} className="list-group-item p-3 d-flex align-items-center rounded-2">
                        <Link
                            //渠道商编辑详情页面
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions/${question._id}`}
                            className="w-100 d-flex align-items-center text-decoration-none"
                        >
                            <div className="w-100 d-flex flex-column">
                                {/* Title */}
                                <span className="fs-5 fw-bold text-black">{question.title}</span>

                                <div className="text-muted">
                                    <strong>Type </strong>
                                    {question.type}
                                </div>

                                <div className="text-muted">
                                    <strong>Description </strong>
                                    {question.questionText}
                                </div>

                                <div className="text-muted">
                                    <strong>Points </strong>
                                    {question.points}
                                </div>
                            </div>
                        </Link>
                        <FaPencil className="text-secondary me-3 fs-5"/>
                        <FaTrash
                            className="text-danger me-3 fs-5"
                            onClick={() => handleDeleteQuestionByID(question._id)}
                        />
                    </li>
                ))}
            </ul>

            <AddQuestionController/>

            <hr/>

            <div className="row">
                <div className="col-12 text-center">
                    <button
                        className="btn btn-danger float-end me-3"
                        onClick={handleUpdateQuiz}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary float-end me-2"
                        onClick={() => handleNavtoQuizzes()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>


    )
}