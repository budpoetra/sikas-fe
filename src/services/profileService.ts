import axios from 'axios';

type ApiResponse<T> = {
    success: boolean;
    message: string;
    status: number;
    data: T;
    timestamp: string;
};

export interface Profile {
    id: number;
    userType: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    status: number;
}

export interface ChangePasswordResponse {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export const fetchProfile = async (
    token: string
): Promise<ApiResponse<Profile>> => {
    try {
        const response = await axios.get(`/account/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 404) {
                return err.response.data;
            }
        }
        throw err;
    }
}

export const changePassword = async (
    token: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
): Promise<ApiResponse<ChangePasswordResponse>> => {
    try {
        const response = await axios.post(`/account/change-password`, {
            oldPassword,
            newPassword,
            confirmPassword
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 400) {
                return err.response.data;
            }
        }
        throw err;
    }
}