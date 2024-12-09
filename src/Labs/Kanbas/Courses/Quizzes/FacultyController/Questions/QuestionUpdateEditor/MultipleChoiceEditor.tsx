import { useState } from "react";
import { Question } from "../../../questionType";
import { useNavigate, useParams } from "react-router-dom";

interface MultipleChoiceEditorProps {
    question: Question; // Question passed as a prop
    onSave: (updatedQuestion: Question) => void; // Save handler
    onCancel: () => void; // Cancel handler
}

export default function MultipleChoiceEditor({ question, onSave, onCancel }: MultipleChoiceEditorProps) {
    const [title, setTitle] = useState<string>(question.title);
    const [points, setPoints] = useState<number>(question.points);
    const [questionText, setQuestionText] = useState<string>(question.questionText);
    const [choices, setChoices] = useState<string[]>(question.choices || []);
    const [correctAnswer, setCorrectAnswer] = useState<string>(question.correctAnswer || ""); // Single correct answer

    const handleChoiceChange = (index: number, value: string) => {
        setChoices((prev) => {
            const updatedChoices = [...prev];
            updatedChoices[index] = value;
            // 如果修改的选项是当前的正确答案，更新它的值
            if (correctAnswer === choices[index]) {
                setCorrectAnswer(value);
            }
            return updatedChoices;
        });
    };

    const addChoice = () => setChoices((prev) => [...prev, ""]); // Add a new empty choice

    const removeChoice = (index: number) => {
        const choiceToRemove = choices[index];
        setChoices((prev) => prev.filter((_, i) => i !== index)); // Remove the specified choice

        // 如果删除的选项是正确答案，则清空正确答案
        if (choiceToRemove === correctAnswer) {
            setCorrectAnswer("");
        }
    };

    const handleSave = () => {
        if (!choices.includes(correctAnswer)) {
            alert("Please select a valid correct answer.");
            return;
        }

        onSave({
            ...question,
            title,
            points,
            questionText,
            choices,
            correctAnswer,
        });
    };

    const navigate = useNavigate();
    const { cid, qid } = useParams();

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions`);
    };

    return (
        <div>
            <h3>Multiple Choice Question Editor</h3>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Points</label>
                <input
                    type="number"
                    className="form-control"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label>Question Text</label>
                <textarea
                    className="form-control"
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                />
            </div>

            <div>
                <label>Choices</label>
                {choices.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                        />
                        <button
                            className="btn btn-danger ms-2"
                            onClick={() => removeChoice(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button className="btn btn-primary" onClick={addChoice}>
                    Add Choice
                </button>
            </div>

            <div className="mt-3">
                <label>Correct Answer</label>
                <select
                    className="form-control"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                    <option value="">Select Correct Answer</option>
                    {choices.map((choice, index) => (
                        <option key={index} value={choice}>
                            {choice}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-4">
                <button className="btn btn-secondary me-2" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Save Question
                </button>
            </div>
        </div>
    );
}