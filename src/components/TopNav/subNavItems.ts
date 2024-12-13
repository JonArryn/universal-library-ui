import { INavItem } from './navItems.ts';

type ISubNavItems = [
    {
        parentRoute: string;
        navItems: INavItem[];
    },
];

const subNavItems: ISubNavItems = [
    {
        parentRoute: '/app/library',
        navItems: [
            {
                navText: 'My Libraries',
                route: '/app/library',
            },
        ],
    },
];

export default subNavItems;
