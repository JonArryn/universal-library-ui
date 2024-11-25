import MobileProfileMenu from './MobileProfileMenu.tsx';
import MobileNav from './MobileNav.tsx';
import MobileMenuButton from './MobileMenuButton.tsx';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
    return (
        <nav className="bg-gray-800 dark:bg-slate-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="shrink-0">
                            <img
                                className="size-8"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/*// <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->//*/}
                                <a
                                    href="#"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                    aria-current="page"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Team
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <NavLink to={'/login'}>
                            <button className="dark:text-slate-50">
                                Login
                            </button>
                        </NavLink>
                        <button className="dark:text-slate-50">Sign Up</button>
                    </div>
                    {/* Nav Right Menu */}
                    <MobileMenuButton />
                </div>
            </div>
            {/*/*<!-- Mobile menu, show/hide based on menu state. -->*/}
            {/* Mobile Menu */}
            <div className="md:hidden" id="mobile-menu">
                <MobileNav />
                <MobileProfileMenu />
            </div>
        </nav>
    );
};

export default TopNav;
