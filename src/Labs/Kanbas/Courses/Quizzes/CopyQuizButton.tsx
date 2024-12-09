import React, { useState, useEffect } from "react";
import { copyQuiz } from "./client"; // Adjust path to client.ts
import { getCourses } from "../client";

interface CopyQuizButtonProps {
    quizId: string; // The ID of the quiz to copy
}

const CopyQuizButton: React.FC<CopyQuizButtonProps> = ({ quizId }) => {
    const [courses, setCourses] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [isCopying, setIsCopying] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Fetch the list of courses when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses = await getCourses();
                setCourses(fetchedCourses);
            } catch (error) {
                setErrorMessage("Failed to load courses. Please try again.");
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleCopy = async () => {
        if (!selectedCourseId) {
            alert("Please select a target course.");
            return;
        }

        try {
            setIsCopying(true);
            await copyQuiz(quizId, selectedCourseId);
            alert("Quiz copied successfully!");
        } catch (error) {
            alert(`Failed to copy quiz: ${error}`);
        } finally {
            setIsCopying(false);
        }
    };

    return (
        <div>
            <label htmlFor="target-course">Copy Quiz To:</label>
            <select
                id="target-course"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
            >
                <option value="" disabled>
                    -- Select a Course --
                </option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.name}
                    </option>
                ))}
            </select>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button onClick={handleCopy} disabled={isCopying || !selectedCourseId}>
                {isCopying ? "Copying..." : "Copy Quiz"}
            </button>
        </div>
    );
};

export default CopyQuizButton;