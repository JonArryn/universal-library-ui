import AuthContext, { IUser, ICredentials } from '../contexts/AuthContext.tsx';
import React, { useState } from 'react';
import apiService from '../api/apiService.ts';

interface IAuthProviderProps {
    children?: React.ReactNode;
}

const AuthProvider = function ({ children }: IAuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const login = async ($credentials: ICredentials): Promise<boolean> => {
        try {
            await apiService.get('/sanctum/csrf-cookie');
            await apiService.post('/api/login', $credentials);
            setIsAuthenticated(true);
            const userResponse = await apiService.get('/api/user');
            const userData: IUser = userResponse.data;
            setUser(userData);

            return true;
        } catch (error: unknown) {
            console.log(error);
            return false;
        }
    };

    const logout = async () => {
        await apiService.post('/api/logout');
        setIsAuthenticated(false);
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
