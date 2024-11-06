import './App.css';
import HomeNavigation from './component/HomeNavigation.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <HomeNavigation />
      <Outlet />
    </>
  );
}

export default App;
