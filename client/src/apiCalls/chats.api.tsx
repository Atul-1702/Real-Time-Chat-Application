import { isAxiosError } from "axios";
import axiosConfig from "./axios.config"


const getUserAllChats = async () => {
    try {
        const response = await axiosConfig.get("/api/chat/get-all-chats");
        return response.data;
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            return error.response?.data;
        }
        else {
            return {
                success: false,
                message: "Something went wrong."
            }
        }
    }
};


export { getUserAllChats };