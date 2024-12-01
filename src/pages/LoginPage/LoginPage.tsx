import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.tsx';

import { useEffect } from 'react';
import LoginForm from './LoginForm.tsx';

const LoginPage = function () {
    const { isSessionActive } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const active = await isSessionActive();
            if (active) {
                navigate('/app');
            }
        };
        checkAuth();
    }, [isSessionActive, navigate]);

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
