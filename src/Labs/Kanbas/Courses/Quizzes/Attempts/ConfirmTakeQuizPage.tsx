import React, { useState, useEffect } from "react";
import {getAttemptById, getAttemptsByQuizAndStudent, getQuizById, startAttempt} from "../client";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Quiz } from "../quizType";
import {Attempt} from "./attemptType";

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

export default function ConfirmTakeQuizPage() {
    const { cid,qid } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const studentId = currentUser._id;

    const [latestScore, setLatestScore] = useState<string>("N/A");     //增加latestScore, setLatestScore

    // 加载最近一次测验分数
    const loadLatestScore = async () => {
        if (qid && studentId) {
            try {
                const attempts = await getAttemptsByQuizAndStudent(qid, studentId);
                if (attempts.length > 0) {
                    // 从最后一个attempt开始向前查找
                    const latestValidAttempt = attempts.reverse().find((attempt: any) => attempt.score != null);
                    if (latestValidAttempt) {
                        setLatestScore(latestValidAttempt.score);
                    } else {
                        // 如果没有任何attempt有分数
                        setLatestScore("N/A");
                    }
                } else {
                    // 如果没有任何记录
                    setLatestScore("No attempts yet");
                }
            } catch (error) {
                console.error("Error fetching attempts:", error);
                setLatestScore("Error loading score");
            }
        }
    };

    // 加载 Quiz 信息
    const loadQuiz = async () => {
        if (qid) {
            setLoading(true);
            try {
                const quizData = await getQuizById(qid);
                setQuiz(quizData);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("Failed to load quiz information. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (qid) {
            loadQuiz();
            loadLatestScore();
        }
    }, [qid]);

    const handleStartQuiz = async () => {
        setLoading(true);
        setError(null);

        try {
            const newAttempt = await startAttempt(qid!, studentId!);
            const attemptId = newAttempt._id;
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt/${attemptId}`);
        } catch (err) {
            console.error("Error starting quiz attempt:", err);
            setError("Failed to start quiz attempt. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToQuizzes = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    return (
        <div className="container mt-5 d-flex flex-column justify-content-center">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && quiz && (
                <>
                    <h2 className="mb-4 text-center">
                        <strong>{quiz.title}</strong>
                    </h2>
                    <h5 className="mb-4 text-center">Once you begin, your attempt will be recorded.</h5>
                    <div className="mt-4 d-flex justify-content-center">
                        <button
                            className="btn btn-secondary me-4"
                            onClick={handleBackToQuizzes}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleStartQuiz}
                            disabled={loading}
                        >
                            Start Quiz
                        </button>
                    </div>
                    <br/>
                    <h4 className="text-center">Your latest score: {latestScore} </h4>
                </>
            )}
        </div>
    );
}