import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppProvider from './providers/AppProvider.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import DashboardPage from './app/pages/DashboardPage.tsx';
import App from './app/App.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import LogOutPage from './pages/LogOutPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/about',
                element: <AboutPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            { path: '/logout', element: <LogOutPage /> },
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
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
);
