import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ENROLL_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};


export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(COURSES_API, course);
    return data;
};


export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const enrollUserInCourse = async (userId:string, courseId:string) => {
    const response = await axiosWithCredentials.post(`${ENROLL_API}`, {
        user: userId,
        course: courseId,
    });
    return response.data;
};

export const unenrollUserFromCourse = async (userId:string, courseId:string) => {
    const response = await axiosWithCredentials.delete(`${ENROLL_API}`, {
        data: { user: userId, course: courseId },
    });
    return response.data;
};


export const getAllEnrollments = async () => {
    const response = await axios.get(ENROLL_API);
    return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};

export const getCourses = async () => {
    try {
        const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
        return data; // Assuming the API returns an array of courses
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Error fetching courses:", error.response?.data || error.message);
            throw error.response?.data?.error || "Failed to fetch courses.";
        } else {
            // Non-Axios error
            console.error("Unexpected error fetching courses:", error);
            throw "An unknown error occurred while fetching courses.";
        }
    }
};
