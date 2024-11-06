import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './page/LoginPage/LoginPage.tsx';
import HomePage from './page/HomePage.tsx';
import RegisterPage from './page/RegisterPage/RegisterPage.tsx';
import AppPage from './app/AppPage.tsx';
import LibrariesPage from './app/page/LibrariesPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/app',
    element: <AppPage />,
    children: [
      {
        path: '/app/dashboard',
        element: <LibrariesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
