import { useNavigate, useLocation } from 'react-router-dom';

interface IProps {
    path: string;
    text: string;
}

function NavigationLink({ path, text }: IProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const defaultClasses: string =
        'rounded-md hover:bg-gray-700 dark:hover:bg-slate-800 px-3 py-2 text-sm font-medium text-white';
    const activeClasses: string =
        'rounded-md dark:bg-gray-900 bg-gray-700 px-3 py-2 text-sm font-medium text-white ring-1 ring-indigo-500 ring-inset';

    return (
        <>
            <button
                className={
                    pathname.startsWith(path) ? activeClasses : defaultClasses
                }
                onClick={() => navigate(path)}
            >
                <p className="rig"></p>
                {text}
            </button>
        </>
    );
}

export default NavigationLink;
