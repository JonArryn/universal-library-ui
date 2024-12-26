import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../api/apiService.ts';

interface IInterceptorProviderProps {
    children: React.ReactNode;
}

function InterceptorProvider({ children }: IInterceptorProviderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        apiService.interceptors.response.use(
            async function (response) {
                return response;
            },
            function async(error) {
                if (
                    error.response.status === 401 &&
                    location.pathname.startsWith('/app')
                ) {
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, []);

    return <>{children}</>;
}

export default InterceptorProvider;
