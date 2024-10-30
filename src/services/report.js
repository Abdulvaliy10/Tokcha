import axiosInstance from "./base";

const getReport = async ({ year }) => {
    try {
        const { data } = await axiosInstance.get(`/books/${year}`);
        return data
    } catch (error) {
        console.error("Xatolik:", error);
        return { error: true };
    }
};

const reportApi = {
    getReport,
}

export default reportApi;
