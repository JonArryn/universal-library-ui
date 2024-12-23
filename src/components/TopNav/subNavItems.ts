import { INavItem } from './navItems.ts';

type SubNavItem = {
    parentRoute: string;
    navItems: INavItem[];
};

type SubNavItems = SubNavItem[];

const subNavItems: SubNavItems = [
    {
        parentRoute: '/app/library',
        navItems: [
            {
                navText: 'My Libraries',
                route: '/app/library',
            },
        ],
    },
    {
        parentRoute: '/app/book',
        navItems: [
            {
                navText: 'My Books',
                route: '/app/book',
            },
        ],
    },
];

export default subNavItems;
