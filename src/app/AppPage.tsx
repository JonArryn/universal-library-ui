import AppNavigation from './component/AppNavigation.tsx';
import { Outlet } from 'react-router-dom';

const AppPage = () => {
  return (
    <>
      <AppNavigation />
      <Outlet />
    </>
  );
};

export default AppPage;
