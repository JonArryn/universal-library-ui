import AuthContext, { TypeAuthContext } from '../contexts/AuthContext.tsx';
import { useContext } from 'react';

const useAuth = function (): TypeAuthContext {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;
