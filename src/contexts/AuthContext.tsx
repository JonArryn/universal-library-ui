import { createContext } from 'react';

export interface ICredentials {
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export type TypeAuthContext = {
    isAuthenticated?: boolean;
    user?: IUser;
    login: (credentials: ICredentials) => Promise<boolean>;
    logout: () => Promise<void>;
    isSessionActive: () => Promise<boolean>;
};

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export default AuthContext;
