export interface INavItem {
    navText: string;
    route: string;
}

const publicNavItems: INavItem[] = [
    { navText: 'Home', route: '/' },
    { navText: 'About', route: '/about' },
];

const publicAccountNavItems: INavItem[] = [
    { navText: 'Log In', route: '/login' },
    { navText: 'Sign Up', route: '/register' },
];

const profileDropdownItems: INavItem[] = [
    { navText: 'My Account', route: '/#' },
    { navText: 'Settings', route: '/#' },
    { navText: 'Log Out', route: '/logout' },
];

export { publicNavItems, publicAccountNavItems, profileDropdownItems };
