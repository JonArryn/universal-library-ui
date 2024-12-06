import './Home.css';
import TopNav from './components/TopNav/TopNav.tsx';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth.tsx';

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
                <TopNav />

                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
