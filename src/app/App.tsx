import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.tsx';
import { useEffect } from 'react';

const App = function () {
    const { isAuthenticated, isSessionActive } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const active = await isSessionActive();
            if (!active) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [isSessionActive, navigate]);

    return (
        <div>
            {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
        </div>
    );
};

export default App;
