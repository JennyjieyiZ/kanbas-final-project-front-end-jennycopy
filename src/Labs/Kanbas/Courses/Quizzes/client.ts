import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

// Create a new quiz within a course (Faculty only)
export const createQuiz = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return data;
};

// Retrieve a list of quizzes for a course
export const getQuizzesByCourse = async (courseId: string) => {
    const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
};

// Retrieve details of a specific quiz
export const getQuizById = async (quizId: string) => {
    const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
    return data;
};

// Update quiz details (Faculty only)
export const updateQuiz = async (quizId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.put(
        `${QUIZZES_API}/${quizId}`,
        quiz
    );
    return data;
};

// Delete a quiz (Faculty only)
export const deleteQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return data;
};

// Publish or unpublish a quiz (Faculty only)
export const togglePublishQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publishStatus`);
    return data;
};


// Copy a quiz to another course
export const copyQuiz = async (quizId: string, targetCourseId: string) => {
    try {
        const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/copy`, {
            targetCourseId,
        });
        return data.quiz; // Return the copied quiz data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios-specific error
            throw error.response?.data?.error || 'Failed to copy quiz';
        } else {
            // Non-Axios error
            throw 'An unknown error occurred';
        }
    }
};

// ==================== Question Functions ====================

const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Add a new question to a quiz (Faculty only)
export const addQuestionToQuiz = async (quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return data;
};

// Retrieve questions for editing (Faculty only)
export const getQuestionsForQuiz = async (quizId: string) => {
    const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return data;
};

// Retrieve questions for taking the quiz (Students)
export const getQuestionsForQuizStudent = async (quizId: string) => {
    const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions/student`);
    return data;
};

// Update a question (Faculty only)
export const updateQuestion = async (questionId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(
        `${QUESTIONS_API}/${questionId}`,
        question
    );
    return data;
};

// Delete a question (Faculty only)
export const deleteQuestion = async (questionId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return data;
};

// get a question by id(Faculty only)
export const getQuestionById = async (questionId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}`);
    return data;
};

// ==================== Attempt Functions ====================

const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

// Start a new quiz attempt (Students)
export const startAttempt = async (quizId: string, studentId: string) => {
    const { data } = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/attempts`,
        { studentId }
    );
    return data;
};

// Submit answers for a quiz attempt (Students)
export const submitAttempt = async (attemptId: string, answers: any) => {
    const { data } = await axiosWithCredentials.post(
        `${ATTEMPTS_API}/${attemptId}/submit`,
        { answers }
    );
    return data;
};

// Retrieve attempts for a quiz (Students)
export const getAttemptsByQuizAndStudent = async (quizId: string, studentId: string) => {
    const { data } = await axios.get(
        `${QUIZZES_API}/${quizId}/attempts`,
        { params: { studentId } }
    );
    return data;
};

// Retrieve details of a specific attempt (Students)
export const getAttemptById = async (quizId: string, attemptId: string) => {
    const { data } = await axios.get(`${QUIZZES_API}/${quizId}/attempts/${attemptId}`);
    return data;
};