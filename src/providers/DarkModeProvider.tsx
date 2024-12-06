import { useEffect, useState } from 'react';
import * as React from 'react';
import DarkModeContext, {
    TypeIsDarkMode,
} from '../contexts/DarkModeContext.tsx';

interface IDarkModeProviderProps {
    children?: React.ReactNode;
}

const DarkModeProvider = ({ children }: IDarkModeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState<TypeIsDarkMode>(() => {
        const storedPreference = localStorage.getItem('isDarkMode');
        return storedPreference ? JSON.parse(storedPreference) : true;
    });
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

        const htmlElement = document.documentElement;
        const bodyElement = document.querySelector('body');
        bodyElement?.classList.add('transition');
        bodyElement?.classList.add('duration-300');
        if (isDarkMode) {
            bodyElement?.classList.add('dark:bg-slate-950');
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [isDarkMode]); // Runs whenever isDarkMode changes
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
