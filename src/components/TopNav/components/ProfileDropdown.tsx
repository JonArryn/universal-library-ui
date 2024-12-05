import useAuth from '../../../hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';

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
                className="absolute -top-5 right-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
            >
                {/*/*<!-- Active: "bg-gray-100 outline-none", Not Active: "" -->*/}
                <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                >
                    My Account
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                >
                    Settings
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                    onClick={handleLogout}
                >
                    Log Out
                </a>
            </div>
        </div>
    );
};

export default ProfileDropdown;
