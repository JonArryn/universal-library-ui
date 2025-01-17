import './Home.css';
import TopNav from './components/TopNav/TopNav.tsx';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth.ts';
import PageHeading from './components/PageHeading.tsx';
import { navItems } from './Constants/navItems.ts';

function Home() {
    const { isSessionActive } = useAuth();

    // for tailwind
    useEffect(() => {
        const htmlElement = document.documentElement; // Access the <html> element
        const bodyElement = document.querySelector('body');

        htmlElement.classList.add('h-full');
        htmlElement.classList.add('bg-gray-100');
        bodyElement?.classList.add('h-full');
    }, []); // Runs once when the app first renders

    useEffect(() => {
        const checkAuth = async function () {
            await isSessionActive();
        };
        checkAuth();
    }, []);

    return (
        <>
            <div className="min-h-full">
                <TopNav mainNavItems={navItems} />
                <PageHeading headingTitle={'Universal Library'} />
                <main>
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
