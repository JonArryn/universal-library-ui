import { useEffect, useState } from 'react';
import { allNavItems, INavItem } from '../Constants/navItems.ts';
import { useLocation } from 'react-router-dom';
import subNavItems from '../Constants/subNavItems.ts';

function useHeading() {
    const [headingTitle, setHeadingTitle] = useState<string | undefined>(
        undefined
    );
    const [menuItems, setMenuItems] = useState<INavItem[] | undefined>([]);

    const { pathname } = useLocation();

    useEffect(() => {
        const allSubNavItems = subNavItems.flatMap((subNavItem) =>
            subNavItem.navItems.map((navItems) => navItems)
        );

        const combinedNavItems = [...allNavItems, ...allSubNavItems];

        const currentNavItem = combinedNavItems.find(
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
