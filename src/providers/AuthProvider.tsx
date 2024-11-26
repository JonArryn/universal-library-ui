import AuthContext, { IUser, ICredentials } from '../contexts/AuthContext.tsx';
import React, { useEffect, useState } from 'react';
import apiService from '../api/apiService.ts';

interface IAuthProviderProps {
    children?: React.ReactNode;
}

const AuthProvider = function ({ children }: IAuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const login = async function (credentials: ICredentials): Promise<boolean> {
        try {
            await apiService.get('/sanctum/csrf-cookie');
            await apiService.post('/api/login', credentials);
            setIsAuthenticated(true);
            await getUser();

            return true;
        } catch (error: unknown) {
            return false;
        }
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
        }
        setIsAuthenticated(true);
        setUser(user);
        return true;
    };

    const getUser = async function () {
        try {
            const userResponse = await apiService.get('/api/user');
            const userData: IUser = userResponse.data;
            return userData;
        } catch (error) {
            return undefined;
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
                logout,
                isSessionActive,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
