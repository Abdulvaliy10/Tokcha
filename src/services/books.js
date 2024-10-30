import axiosInstance from "./base";


const getBooks = async (page) => {
    try {
        const { data } = await axiosInstance.get('/books');
        return data
    } catch (error) {
        console.error("Xatolik:", error);
        return { error: true };
    }
};

const booksApi = {
    getBooks,
}

export default booksApi;
