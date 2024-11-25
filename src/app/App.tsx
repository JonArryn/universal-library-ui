import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth.tsx';

const App = function () {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
        </div>
    );
};

export default App;
