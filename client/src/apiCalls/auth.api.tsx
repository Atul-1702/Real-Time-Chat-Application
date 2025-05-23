

import { isAxiosError } from "axios";
import SigninModel from "../models/signin.model";
import SignupModel from "../models/signup.model";
import axiosConfig from "./axios.config";

export const signupApiCall = async (formData: SignupModel) => {

    try {
        const response = await axiosConfig.post('/api/auth/signup', formData);
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
            };
        }
    }
}

export const signinApicall = async (formData: SigninModel) => {
    try {
        const response = await axiosConfig.post('/api/auth/signin', formData);
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
            };
        }
    }
}

