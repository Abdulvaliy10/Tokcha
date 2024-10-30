import axiosInstance from "./base";

const getMonthReport = async ({ monthId, year }) => {
    try {
        const { data } = await axiosInstance.get(`/books/${year}/${monthId}`);
        return data;
    } catch (error) {
        console.error("Xatolik:", error);
        return { error: true };
    }
};

const MonthReportApi = {
    getMonthReport,
}

export default MonthReportApi;
