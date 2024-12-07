export interface INavItem {
    navText: string;
    route: string;
}

const navItems: INavItem[] = [
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

const appNavItems: INavItem[] = [
    { navText: 'Dashboard', route: '/app' },
    { navText: 'Libraries', route: '/app/libraries' },
];

export { navItems, publicAccountNavItems, profileDropdownItems, appNavItems };
