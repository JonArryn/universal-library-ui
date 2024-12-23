import { createContext } from 'react';
import { IApiErrorResponse, IApiOkResponse } from '../api/apiService.ts';
import { IRegisterUserData } from '../pages/RegisterPage/RegisterForm.tsx';

export interface ICredentials {
    email: string;
    password: string;
}

export interface IUser {
    type: 'user';
    id: number;
    name: string;
    email: string;
}

export type TypeAuthContext = {
    isAuthenticated?: boolean;
    user?: IUser;
    login: (
        credentials: ICredentials
    ) => Promise<IApiOkResponse | IApiErrorResponse>;
    register: (
        formData: IRegisterUserData
    ) => Promise<IApiOkResponse | IApiErrorResponse>;
    logout: () => Promise<void>;
    isSessionActive: () => Promise<boolean>;
};

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export default AuthContext;
