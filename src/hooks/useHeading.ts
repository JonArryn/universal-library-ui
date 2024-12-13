import { useEffect, useState } from 'react';
import { allNavItems, INavItem } from '../components/TopNav/navItems.ts';
import { useLocation } from 'react-router-dom';
import subNavItems from '../components/TopNav/subNavItems.ts';

function useHeading() {
    const [headingTitle, setHeadingTitle] = useState<string | undefined>(
        undefined
    );
    const [menuItems, setMenuItems] = useState<INavItem[] | undefined>([]);

    const { pathname } = useLocation();

    useEffect(() => {
        const currentNavItem = allNavItems.find(
            (navItem) => navItem.route === pathname
        );

        setHeadingTitle(currentNavItem?.navText);

        const currentSubNavItem = subNavItems.find(
            (navItem) => navItem.parentRoute === pathname
        );

        setMenuItems(currentSubNavItem?.navItems);
    }, [pathname]);

    return { headingTitle, menuItems };
}

export default useHeading;
