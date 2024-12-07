import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm.tsx';

function RegisterPage() {
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
            <RegisterForm />
        </>
    );
}

export default RegisterPage;
