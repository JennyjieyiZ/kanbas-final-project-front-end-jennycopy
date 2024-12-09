import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenPublishedCheckmark from "./GreenMark";
import CopyQuizButton from "../../Quizzes/CopyQuizButton"; // 引入 CopyQuizButton 组件

export default function QuizControlButtons({
    quiz,
    deleteQuiz,
    editQuiz,
    publishQuiz,
}: {
    quiz: {
        _id: string;
        published: boolean;
    };
    deleteQuiz: (quizId: string) => void;
    editQuiz: (quizId: string) => void;
    publishQuiz: (quizId: string, publish: boolean) => void;
}) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [showCopyDialog, setShowCopyDialog] = useState(false); // 控制复制测验对话框显示

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="float-end d-flex align-items-center position-relative">
            {/* 显示已发布的绿色对号 */}
            <GreenPublishedCheckmark isPublished={quiz.published} />
            <IoEllipsisVertical
                className="fs-1"
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
            />

            {menuVisible && (
                <div
                    className="position-absolute bg-white border rounded shadow p-2"
                    style={{
                        top: "100%",
                        right: "0",
                        zIndex: 1000,
                    }}
                >
                    {/* 编辑测验 */}
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            editQuiz(quiz._id);
                            setMenuVisible(false);
                        }}
                    >
                        Edit
                    </button>

                    {/* 删除测验 */}
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            deleteQuiz(quiz._id);
                            setMenuVisible(false);
                        }}
                    >
                        Delete
                    </button>

                    {/* 发布或取消发布测验 */}
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            publishQuiz(quiz._id, !quiz.published);
                            setMenuVisible(false);
                        }}
                    >
                        {quiz.published ? "Unpublish" : "Publish"}
                    </button>

                    {/* 复制测验按钮 */}
                    <button
                        className="btn btn-link text-start w-100 text-decoration-none text-dark"
                        onClick={() => {
                            setShowCopyDialog(true); // 打开复制对话框
                            setMenuVisible(false);
                        }}
                    >
                        Copy
                    </button>
                </div>
            )}

            {/* 复制测验对话框 */}
            {showCopyDialog && (
                <div className="top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
                    <div className="bg-white p-4 rounded shadow">
                        <h5>Copy Quiz</h5>
                        <CopyQuizButton quizId={quiz._id} /> {/* 使用 CopyQuizButton */}
                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() => setShowCopyDialog(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}