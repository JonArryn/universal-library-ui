import './App.css';
import AppNavigation from './component/AppNavigation.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <AppNavigation />
      <Outlet />
    </>
  );
}

export default App;
