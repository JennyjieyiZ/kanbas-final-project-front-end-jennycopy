import { useState } from "react";
import { Question } from "../../../questionType";

interface FillInTheBlankEditorProps {
    question: Question;
    onSave: (updatedQuestion: Question) => void;
    onCancel: () => void;
}

function FillInTheBlankEditor({ question, onSave, onCancel }: FillInTheBlankEditorProps) {
    const [title, setTitle] = useState<string>(question.title);
    const [points, setPoints] = useState<number>(question.points);
    const [questionText, setQuestionText] = useState<string>(question.questionText);
    const [correctAnswer, setCorrectAnswer] = useState<string>(question.correctAnswer || ""); // Single correct answer

    const handleSave = () => {
        const updatedQuestion: Question = {
            ...question,
            title,
            points,
            questionText,
            correctAnswer, // Save single correct answer
        };
        onSave(updatedQuestion);
    };

    return (
        <div>
            <h3>Fill in the Blank Question Editor</h3>
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

            <div className="mb-3">
                <label>Correct Answer</label>
                <input
                    type="text"
                    className="form-control"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)} // Update single correct answer
                />
            </div>

            <div className="mt-4">
                <button className="btn btn-secondary me-2" onClick={onCancel}>
                    Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Save Question
                </button>
            </div>
        </div>
    );
}

export default FillInTheBlankEditor;