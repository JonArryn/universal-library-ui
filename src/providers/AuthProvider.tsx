import AuthContext, { IUser, ICredentials } from '../contexts/AuthContext.tsx';
import React, { useState } from 'react';
import apiService, { IApiOkResponse } from '../api/apiService.ts';

import { IRegisterUserData } from '../pages/RegisterPage/RegisterForm.tsx';
import { AxiosError } from 'axios';

interface IAuthProviderProps {
    children?: React.ReactNode;
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
        await apiService.post('/api/logout');
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
            if (error instanceof AxiosError) {
                setIsAuthenticated(false);
                setUser(undefined);
            }
        }
    };

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
