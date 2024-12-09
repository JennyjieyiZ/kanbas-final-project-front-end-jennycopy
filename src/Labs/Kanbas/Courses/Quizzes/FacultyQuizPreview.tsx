import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {mockQuiz, Quiz} from "./quizType";
import {Attempt, attemptInitialState, mockAttempt} from "./Attempts/attemptType";
import {Question} from "./questionType";
//todo:写完学生的加这个就行，就是多加了个按钮并且edit quiz是直接返回到对应的edit页面，然后去除掉次数限制

export default function FacultyQuizPreview() {
    const { cid,qid, attemptId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [attempt, setAttempt] = useState<Attempt>(attemptInitialState);//这个可以是null
    const [score, setScore] = useState<number | null>(null);
    //todo:感觉有问题，需要createattempt,看看这个功能放哪里，应该是点击quzi学生点击attempt的时候，那可能就直接fetch attempt id了
    useEffect(() => {
        const fetchQuizData = async () => {
            //todo:数据换成真正的数据
            const fetchedQuiz: Quiz = mockQuiz;
            setQuiz(fetchedQuiz);

            // todo：直接根据id获取新建的attempt,用attemptId
            const fetchAttempt: Attempt = mockAttempt;
            setAttempt(fetchAttempt);
        };

        fetchQuizData();
    }, [qid]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    //注意这个是交了后的数据，别和fetch的弄混了
    const submitQuiz = async () => {
        if (!quiz) return;
        //todo:这个是拿到返回的真实值
        const submitedAttempt = mockAttempt;
        //todo:提交后拿到返回的数据，给个分数
        setScore(submitedAttempt.score);
        // 模拟存储尝试
        setAttempt(submitedAttempt) //这个应该就是展示下分数了
    };
    //todo: 这个变了一下
    const handleNavtoQuizzes =()=>{
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`); // 动态导航到该课程的编辑
    }
    //todo: 去除了这个
    // if (quiz && attempt.attemptNumber >= quiz.settings.attemptsAllowed) {
    //     return <p>You have reached the maximum number of attempts for this quiz.</p>;
    // }

    return (
        <div className="container mt-4">
            {quiz && (
                <>
                    <h2>{quiz.title}</h2>
                    <p>
                        Attempt {attempt.attemptNumber + 1}/{quiz.settings.attemptsAllowed}
                    </p>
                    {/*todo: 这个有可能没populate过来，注意下*/}
                    {attempt.answers.map((answer) => {
                        // Type Narrowing: Check if `answer.questionId` is a `Question` object or a string
                        const question = typeof answer.questionId === "string" ? null : (answer.questionId as Question);

                        return (
                            <div key={question?._id ?? (answer.questionId as string)} className="mb-3">
                                {/* Render the Question */}
                                <h5>{question?.questionText ?? "Question not available"}</h5>

                                {/* Render Multiple Choice or True/False options */}
                                {question?.type === "Multiple Choice" || question?.type === "True/False" ? (
                                    question.choices?.map((option: string) => (
                                        <div key={option}>
                                            <input
                                                type="radio"
                                                name={question._id}
                                                value={option}
                                                checked={answers[question._id] === option}
                                                onChange={() => handleAnswerChange(question._id, option)}
                                            />
                                            <label className="ms-2">{option}</label>
                                        </div>
                                    ))
                                ) : null}

                                {/* Render Fill in the Blank input */}
                                {question?.type === "Fill in the Blank" ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your answer here"
                                        value={answers[question._id] ?? ""}
                                        onChange={(e) =>
                                            handleAnswerChange(question._id, e.target.value)
                                        }
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                    <button className="btn btn-secondary me-3" onClick={handleNavtoQuizzes}>
                        {/* todo:这个变成导航到编辑 */}
                        Edit Quiz
                    </button>
                    <button className="btn btn-danger me-3" onClick={submitQuiz}>
                        Submit Quiz
                    </button>
                    {score !== null && <p>Your Score: {score}/{quiz.points}</p>}
                </>
            )}
        </div>
    );
}