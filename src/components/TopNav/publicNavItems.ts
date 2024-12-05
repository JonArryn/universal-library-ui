interface INavItem {
    navText: string;
    route: string;
}

const publicNavItems: INavItem[] = [
    { navText: 'Home', route: '/' },
    { navText: 'About', route: '/about' },
];

export default publicNavItems;
