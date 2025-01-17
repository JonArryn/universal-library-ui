export interface INavItem {
    navText: string;
    route: string;
    hidden?: boolean;
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
    { navText: 'Log Out', route: '/logout' },
];

const appNavItems: INavItem[] = [
    { navText: 'Dashboard', route: '/app/dashboard' },
    { navText: 'Libraries', route: '/app/library' },
    { navText: 'Books', route: '/app/book' },
];

const allNavItems = [
    ...navItems,
    ...publicAccountNavItems,
    ...profileDropdownItems,
    ...appNavItems,
];

export {
    navItems,
    publicAccountNavItems,
    profileDropdownItems,
    appNavItems,
    allNavItems,
};
