import { createContext } from 'react';

export type TypeIsDarkMode = boolean;

type DarkModeContextType = {
    isDarkMode: TypeIsDarkMode;
    toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
    undefined
);

export default DarkModeContext;
