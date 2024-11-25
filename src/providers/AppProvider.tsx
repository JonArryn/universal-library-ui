import * as React from 'react';
import DarkModeProvider from './DarkModeProvider.tsx';
import AuthProvider from './AuthProvider.tsx';

interface IProps {
    children?: React.ReactNode;
}

const AppProvider = function ({ children }: IProps) {
    return (
        <DarkModeProvider>
            <AuthProvider>{children}</AuthProvider>
        </DarkModeProvider>
    );
};

export default AppProvider;
