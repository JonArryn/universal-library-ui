import useAuth from '../../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import { profileDropdownItems } from '../../../Constants/navItems.ts';
import MenuItem from './MenuItem.tsx';

const ProfileDropdown = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async function () {
        await logout();
        navigate('/logout');
    };

    return (
        <div className="relative ml-3">
            <div
                className="absolute -top-5 right-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-900 dark:text-slate-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
            >
                {profileDropdownItems.map((item, index) => (
                    <MenuItem
                        text={item.navText}
                        tabIndex={index}
                        handleClick={handleLogout}
                    />
                ))}
                {/*/*<!-- Active: "bg-gray-100 outline-none", Not Active: "" -->*/}
            </div>
        </div>
    );
};

export default ProfileDropdown;
