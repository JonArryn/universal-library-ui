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
import LibraryPage from './app/pages/Library/LibraryPage.tsx';
import CreateLibraryPage from './app/pages/Library/CreateLibraryPage.tsx';
import MyLibrariesPage from './app/pages/Library/MyLibrariesPage.tsx';
import BookPage from './app/pages/Book/BookPage.tsx';
import MyBooksPage from './app/pages/Book/MyBooksPage.tsx';

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
            {
                path: '/app/library',
                element: <LibraryPage />,
                children: [
                    {
                        path: '/app/library',
                        element: <MyLibrariesPage />,
                    },
                    {
                        path: '/app/library/create',
                        element: <CreateLibraryPage />,
                    },
                ],
            },
            {
                path: '/app/book',
                element: <BookPage />,
                children: [
                    {
                        path: '/app/book',
                        element: <MyBooksPage />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
);
