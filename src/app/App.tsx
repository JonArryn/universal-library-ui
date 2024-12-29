import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';
import { useEffect } from 'react';
import TopNav from '../components/TopNav/TopNav.tsx';

import { appNavItems } from '../Constants/navItems.ts';
import InterceptorProvider from '../providers/InterceptorProvider.tsx';

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
            <InterceptorProvider>
                <TopNav mainNavItems={appNavItems} />

                <div>
                    {isAuthenticated ? (
                        <Outlet />
                    ) : (
                        <Navigate to="/login" replace />
                    )}
                </div>
            </InterceptorProvider>
        </>
    );
};

export default App;
