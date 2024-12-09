
import FacultyQuizController from "./FacultyController/FacultyQuizController";
import {BsBookHalf, BsGripVertical, BsPlus} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import {Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Quiz, quizInitialState} from "./quizType";//这个里面定义了数据类型，需要查看看这里
import {deleteQuiz, getQuizzesByCourse, togglePublishQuiz} from './client';
import QuizControlButtons from "./FacultySideThreeDotsController/DotsController";
import {useDispatch, useSelector} from "react-redux";
import { deleteQuiz as deleteQuizRedux } from "./reducer";

interface User {
    _id: string;
    role: string;
}

interface Enrollment {
    user: string;
    course: string;
}
interface RootState {
    accountReducer: {
        currentUser: User;
    };
    enrollmentReducer: {
        enrollments: Enrollment[];
    };
}

export default function Quizzes() {
    //获取到了userId 和 courseId
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFacultyOrAdmin = ["FACULTY", "ADMIN"].includes(currentUser.role.toUpperCase());
    const { cid } = useParams();
    const [sortOrder, setSortOrder] = useState('asc');
    //设置获取quizzes的变化
    const [quizzes, setQuizzes] = useState<Quiz[]>([quizInitialState]);

    //获取当前课程下的所有quizz,每次cid变化更新
    const fetchQuizzes = async (courseId: string) => {
        console.log("fetch quizzes from course  " + courseId)
        try {
            const fetchedQuizzes = await getQuizzesByCourse(courseId);
            setQuizzes(fetchedQuizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    const dispatch = useDispatch();
    const handleDeleteQuizzes = async ( quizId: string) => {
        try{
            const response = await deleteQuiz(quizId);
                console.log("Quiz deleted successfully");
                setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
                // 更新 Redux 状态
                dispatch(deleteQuizRedux(quizId));
        }catch (error){
            console.error("Error deleting quizzes:", error);
        }
    }

    const handleSortQuizzes = async () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder); // 更新排序方向
        try {
            const sortedQuizzes = await getQuizzesByCourse(cid!, `title_${newSortOrder}`);
            setQuizzes(sortedQuizzes);
        } catch (error) {
            console.error("Error fetching sorted quizzes:", error);
        }
    };

    //nav to edit page
    const navigate = useNavigate();
    const handleNavToEditPage = (quizId: string, courseId: string)  => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editor`);
    };

    const handleTogglePublishQuiz = async (courseId: string,quizId: string) => {
        if (!quizId) {
            console.error("Quiz ID is missing");
            return;
        }
        try {
            // 调用后端 API 切换发布状态
            const response = await togglePublishQuiz(quizId);

            if (response) {
                console.log(`Quiz ${quizId} publish status updated successfully.`);
                // 如果需要，更新前端状态，例如重新获取所有 quizzes 列表
                fetchQuizzes(courseId);
            } else {
                console.warn(`Failed to update publish status for quiz ${quizId}.`);
            }
        } catch (error) {
            console.error(`Error toggling publish status for quiz ${quizId}:`, error);
        }

    }

    //传入user role,是教授导航到编辑，学生导航到考试
    function navToDifferentLink (cid: string, quizId: string):string{
        if (isFacultyOrAdmin) {
            return `/Kanbas/Courses/${cid}/Quizzes/${quizId}/review`;
        }else{
            return `/Kanbas/Courses/${cid}/Quizzes/${quizId}/attempt`;
        }
    }

    // todo: 课程内实时更新需要quiz需要用reducer
    useEffect(() => {
        if (cid) {
            fetchQuizzes(cid);
        }else {
            console.error("Course ID (cid) is missing or invalid");
        }
    }, []);

    return (
        <div id="wd-quizzes">
            {/*添加课程用*/}
            <div id="wd-assignments" className="p-3">
                {/*render if its admin or faculty*/}
                {isFacultyOrAdmin && <FacultyQuizController/>}
            </div>


            {/*前面的装饰条，不用管*/}
            <div id="wd-assignments-title"
                 className="d-flex justify-content-between align-items-center bg-secondary p-3 mb-0">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="fs-1 me-2"/>
                    Assignment Quizzes
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <IoEllipsisVertical className="fs-1 text-muted ms-2"/>
                </div>
            </div>

            <ul id="wd-quizzes-list" className="list-group rounded-0">
                {quizzes
                    .filter((quiz: Quiz) => isFacultyOrAdmin || quiz.published) // 非管理员/教师用户只显示已发布的测验
                    .map((quiz: Quiz) => (
                        <li key={quiz._id} className="list-group-item p-3 d-flex align-items-center wd-lesson">
                            <Link
                                // 导航到不同页面
                                to={navToDifferentLink(cid ?? "6747e89997ff8ea63ab721ae", quiz._id)}
                                className="w-100 d-flex align-items-center text-decoration-none"
                            >
                                <BsGripVertical className="fs-1 me-2 text-muted text-black"/>
                                <BsBookHalf className="fs-1 me-3 text-success"/>
                                <div className="w-100 d-flex flex-column">
                                    {/* 测验标题 */}
                                    <span className="fs-5 fw-bold text-black">{quiz.title}</span>

                                    {/* 可用性信息 */}
                                    <div className="text-muted">
                                        <p>
                                            <strong>Available at:</strong>{" "}
                                            {quiz.availableFrom ? new Date(quiz.availableFrom).toLocaleDateString() : "N/A"} |{" "}
                                            <strong>Not available at:</strong>{" "}
                                            {quiz.availableUntil ? new Date(quiz.availableUntil).toLocaleDateString() : "N/A"}
                                        </p>
                                    </div>

                                    {/* 截止日期和分数 */}
                                    <div className="text-muted">
                                        <p>
                                            <strong>Due:</strong>{" "}
                                            {quiz.availableFrom ? new Date(quiz.availableFrom).toLocaleDateString() : "N/A"} |{" "}
                                            <strong>{quiz.points || 0} pt</strong>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="text-muted ms-auto">
                                {isFacultyOrAdmin && (
                                    <QuizControlButtons
                                        quiz={quiz}
                                        deleteQuiz={() => handleDeleteQuizzes(quiz._id)}
                                        editQuiz={() => handleNavToEditPage(quiz._id,cid ?? "6747e89997ff8ea63ab721ae")}
                                        publishQuiz={() => handleTogglePublishQuiz(cid ?? "6747e89997ff8ea63ab721ae", quiz._id)}
                                        sortQuizzes={() => handleSortQuizzes()}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}