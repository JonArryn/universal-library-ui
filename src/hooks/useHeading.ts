import { useEffect, useState } from 'react';
import {
    appNavItems,
    navItems,
    publicAccountNavItems,
} from '../components/TopNav/navItems.ts';
import { useLocation } from 'react-router-dom';

function useHeading() {
    const [headingTitle, setHeadingTitle] = useState<string | undefined>(
        undefined
    );

    const { pathname } = useLocation();

    useEffect(() => {
        const joinedNavItems = [
            ...navItems,
            ...publicAccountNavItems,
            ...appNavItems,
        ];

        const currentNavItem = joinedNavItems.find(
            (navItem) => navItem.route === pathname
        );

        setHeadingTitle(currentNavItem?.navText);
    }, [pathname]);

    return { headingTitle };
}

export default useHeading;
