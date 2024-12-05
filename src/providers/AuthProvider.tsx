import AuthContext, { IUser, ICredentials } from '../contexts/AuthContext.tsx';
import React, { useEffect, useState } from 'react';
import apiService, { IApiOkResponse } from '../api/apiService.ts';

interface IAuthProviderProps {
    children?: React.ReactNode;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegisterUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    root?: { message: string };
    generic?: string;
}

const AuthProvider = function ({ children }: IAuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const register = async function (formData: IRegisterUserData) {
        await apiService.get('/sanctum/csrf-cookie');
        const response = await apiService.post('/api/register', formData);
        const registerResponseData: IApiOkResponse = response.data;
        if (registerResponseData.status === 201) {
            setIsAuthenticated(true);
            setUser(registerResponseData.data.user);
        }
        console.log(response);
        return registerResponseData;
    };

    const login = async function (
        credentials: ICredentials
    ): Promise<IApiOkResponse> {
        await apiService.get('/sanctum/csrf-cookie');
        const response = await apiService.post('/api/login', credentials);
        const loginResponseData: IApiOkResponse = response.data;
        if (loginResponseData.status === 200) {
            setIsAuthenticated(true);
            await getUser();
        }
        return loginResponseData;
    };

    const logout = async function () {
        const logoutResponse = await apiService.post('/api/logout');
        console.log(logoutResponse);
        setIsAuthenticated(false);
        setUser(undefined);
    };

    const isSessionActive = async function (): Promise<boolean> {
        const user = await getUser();
        if (!user) {
            setIsAuthenticated(false);
            setUser(undefined);
            return false;
        } else {
            if (!isAuthenticated) {
                setIsAuthenticated(true);
            }
            if (!user) {
                setUser(user);
            }
            return true;
        }
    };

    const getUser = async function () {
        try {
            const userResponse = await apiService.get('/api/user');
            const userData: IUser = userResponse.data;
            return userData;
        } catch (error: unknown) {
            // TODO: Better handle errors in AuthProvider getUser function
            console.log(error);
        }
    };

    useEffect(() => {
        apiService.interceptors.response.use(
            async function (response) {
                return response;
            },
            function async(error) {
                if (error.response.data.status === 401) {
                    console.log('401 returned from useEffect interceptor');
                }
                return Promise.reject(error);
            }
        );
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                register,
                logout,
                isSessionActive,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
