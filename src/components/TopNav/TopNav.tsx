import MobileProfileMenu from './components/MobileProfileMenu.tsx';
import MobileNav from './components/MobileNav.tsx';
import MobileMenuButton from './components/MobileMenuButton.tsx';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.tsx';
import { CgProfile } from 'react-icons/cg';
import NavigationLink from './components/NavigationLink.tsx';
import StyledButton from '../StyledButton.tsx';

const TopNav = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const LoginLinks = function () {
        return (
            <div className="flex gap-3">
                <NavLink to={'/login'}>
                    <button className="text-slate-50">Login</button>
                </NavLink>
                <button className="text-slate-50">Sign Up</button>
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
                <StyledButton
                    Icon={<CgProfile />}
                    handleClick={() => navigate('/profile')}
                />
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
