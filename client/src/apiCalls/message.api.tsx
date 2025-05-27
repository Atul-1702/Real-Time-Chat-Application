import { isAxiosError } from "axios";
import axiosConfig from "./axios.config"


const sendNewMessage = async (message) => {
    try {
        const response = await axiosConfig.post('/api/message/send-message', message);
        return response.data;
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            return error.response?.data;
        }
        return {
            success: false,
            message: "Something went wrong!"
        };
    }
}

const getUserAllMessages = async (chatId) => {
    try {
        const response = await axiosConfig.get('/api/message/get-all-messages/' + chatId);
        return response.data;
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            return error.response?.data;
        }
        return {
            success: false,
            message: "Something went wrong!"
        };
    }
}

export {
    sendNewMessage,
    getUserAllMessages
}