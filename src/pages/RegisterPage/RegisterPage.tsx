import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm.tsx';

function RegisterPage() {
    const { isSessionActive, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (isAuthenticated) {
                const active = await isSessionActive();

                if (active) {
                    navigate('/app/dashboard');
                }
            }
        };
        checkAuth();
    }, [isAuthenticated, isSessionActive, navigate]);

    return (
        <>
            <RegisterForm />
        </>
    );
}

export default RegisterPage;
