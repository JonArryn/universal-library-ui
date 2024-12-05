import MobileProfileMenu from './components/MobileProfileMenu.tsx';
import MobileNav from './components/MobileNav.tsx';
import MobileMenuButton from './components/MobileMenuButton.tsx';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.tsx';
import { CgProfile } from 'react-icons/cg';
import NavigationLink from './components/NavigationLink.tsx';
import StyledButton from '../StyledButton.tsx';
import ProfileDropdown from './components/ProfileDropdown.tsx';
import { useEffect, useRef, useState } from 'react';

const TopNav = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = function () {
        setMenuOpen((prev) => !prev); // Toggle the menu on button click
    };

    const handleClickOutside = function (event: MouseEvent) {
        // Close the menu if clicking outside of it
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside the menu
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup event listener on component unmount
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const LoginLinks = function () {
        return (
            <div className="flex gap-3">
                <Link to={'/login'}>
                    <button className="text-slate-50">Login</button>
                </Link>
                <Link to={'/register'} className="text-slate-50">
                    Sign Up
                </Link>
            </div>
        );
    };

    const DashboardLinks = function () {
        return (
            <div className="flex items-center gap-3">
                <StyledButton
                    text={'Dashboard'}
                    style={'secondary'}
                    handleClick={() => navigate('/app')}
                />
                <div>
                    <StyledButton
                        Icon={<CgProfile />}
                        handleClick={toggleMenu}
                    />
                </div>
            </div>
        );
    };
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
                                <NavigationLink path={'/'} text={'Home'} />
                                <NavigationLink
                                    path={'/about'}
                                    text={'About'}
                                />
                            </div>
                        </div>
                    </div>
                    {isAuthenticated ? <DashboardLinks /> : <LoginLinks />}
                    {/* Nav Right Menu */}
                    <MobileMenuButton />
                </div>
                {menuOpen && (
                    <div ref={menuRef}>
                        <ProfileDropdown />
                    </div>
                )}
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