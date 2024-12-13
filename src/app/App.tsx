import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';
import { useEffect } from 'react';
import TopNav from '../components/TopNav/TopNav.tsx';

import { appNavItems } from '../components/TopNav/navItems.ts';

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
        <>
            <TopNav mainNavItems={appNavItems} />

            <div>
                {isAuthenticated ? (
                    <Outlet />
                ) : (
                    <Navigate to="/login" replace />
                )}
            </div>
        </>
    );
};

export default App;
