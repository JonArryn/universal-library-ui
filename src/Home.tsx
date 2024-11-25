import './Home.css';
import TopNav from './components/topNav/TopNav.tsx';
import { Outlet } from 'react-router-dom';
import Heading from './components/Heading.tsx';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        const htmlElement = document.documentElement; // Access the <html> element
        const bodyElement = document.querySelector('body');

        htmlElement.classList.add('h-full');
        htmlElement.classList.add('bg-gray-100');
        bodyElement?.classList.add('h-full');
    }, []); // Runs once when the app first renders
    return (
        <>
            <div className="min-h-full">
                <TopNav />
                <Heading />
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
