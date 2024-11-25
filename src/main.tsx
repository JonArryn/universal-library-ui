import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppProvider from './providers/AppProvider.tsx';
import LoginPage from './pages/LoginPage.tsx';
import DashboardPage from './app/DashboardPage.tsx';
import App from './app/App.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
        ],
    },
    {
        path: '/app',
        element: <App />,
        children: [
            {
                path: '/app',
                element: <DashboardPage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </StrictMode>
);
