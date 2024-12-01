import { useNavigate, useLocation } from 'react-router-dom';

interface IProps {
    path: string;
    text: string;
}

function NavigationLink({ path, text }: IProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const defaultClasses: string =
        'rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 text-sm font-medium hover:text-white text-gray-300';
    const activeClasses: string =
        'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white';
    return (
        <>
            <button
                className={pathname === path ? activeClasses : defaultClasses}
                onClick={() => navigate(path)}
            >
                {text}
            </button>
        </>
    );
}

export default NavigationLink;
