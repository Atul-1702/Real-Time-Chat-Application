import { isAxiosError } from "axios";
import axiosConfig from "./axios.config"


export const getUserDetails = async () => {
    try {
        const response = await axiosConfig.get("/api/user/user-details");
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

}

export const getAllUserDetails = async () => {

    try {
        const response = await axiosConfig.get("/api/user/all-user-details");
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
}