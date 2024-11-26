import { useContext } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';

export const useDarkModeContext = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error(
            'useDarkModeContext must be used within a ThemeContextProvider'
        );
    }
    return context;
};
