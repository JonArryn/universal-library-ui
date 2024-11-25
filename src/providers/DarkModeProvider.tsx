import { useEffect, useState } from 'react';
import * as React from 'react';
import DarkModeContext, {
    TypeIsDarkMode,
} from '../contexts/DarkModeContext.tsx';

interface IDarkModeProviderProps {
    children?: React.ReactNode;
}

const DarkModeProvider = ({ children }: IDarkModeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState<TypeIsDarkMode>(true);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    useEffect(() => {
        const htmlElement = document.documentElement; // Access the <html> element
        const bodyElement = document.querySelector('body');
        if (isDarkMode) {
            bodyElement?.classList.add('transition');
            bodyElement?.classList.add('duration-300');
            bodyElement?.classList.add('dark:bg-slate-950');
            htmlElement.classList.add('dark'); // Append the "dark" class
        } else {
            htmlElement.classList.remove('dark'); // Remove the "dark" class
        }
    }, [isDarkMode]); // Runs whenever isDarkMode changes
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
