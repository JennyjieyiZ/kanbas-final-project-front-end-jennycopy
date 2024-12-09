import {Question} from "../questionType";

export type Attempt = {
    _id: string; // MongoDB ObjectId
    quizId: string; // MongoDB ObjectId referencing the Quiz
    studentId: string; // MongoDB ObjectId referencing the User
    answers: {
        questionId: string | Question; // MongoDB ObjectId referencing the Question
        answer: string; // The answer provided by the student
        isCorrect: boolean; // Whether the answer was correct
    }[];// 存储学生回答的数组，每个回答包括题目 ID、答案和是否正确
    score: number; // Total score for the attempt
    attemptNumber: number; // The number of this attempt (e.g., 1st, 2nd)
    dateAttempted: Date; // Date when the attempt was made (ISO string)
};

export const attemptInitialState: Attempt = {
    _id: "1234", // todo:记得删除，初始化的时候
    quizId: "", // Must be a valid Quiz ID
    studentId: "", // Must be a valid Student/User ID
    answers: [], // Default is no answers
    score: 0, // Default score is 0
    attemptNumber: 1, // First attempt by default
    dateAttempted: new Date(), // Current date as default
};


export const mockAttempt: Attempt = {
    _id: "1234", // Mock attempt ID
    quizId: "quiz123", // Mock quiz ID
    studentId: "student123", // Mock student ID
    answers: [
        {
            questionId: {
                _id: "q1",
                quizId: "quiz123", // Associated quiz ID
                type: "Multiple Choice",
                title: "Simple Math Question",
                points: 5,
                questionText: "What is 2 + 2?",
                choices: ["2", "3", "4"],
                correctAnswer: "4",
            },
            answer: "4",
            isCorrect: true,
        },
        {
            questionId: {
                _id: "q2",
                quizId: "quiz123", // Associated quiz ID
                type: "True/False",
                title: "Earth Question",
                points: 5,
                questionText: "Is Earth a planet?",
                choices: ["True", "False"],
                correctAnswer: "True",
            },
            answer: "True",
            isCorrect: true,
        },
        {
            questionId: {
                _id: "q3",
                quizId: "quiz123", // Associated quiz ID
                type: "Fill in the Blank",
                title: "Sky Color Question",
                points: 10,
                questionText: "Fill in the blank: The sky is ____.",
                correctAnswers: ["blue"],
            },
            answer: "blue",
            isCorrect: true,
        },
    ],
    score: 20, // Mock score
    attemptNumber: 0, // First attempt
    dateAttempted: new Date(), // Current date
};

