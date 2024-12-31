import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FaToggleOff } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';
import { FaRegSun } from 'react-icons/fa';
import { FaToggleOn } from 'react-icons/fa';
import { BsMoonStars } from 'react-icons/bs';
import { useDarkModeContext } from '../hooks/useDarkModeContext.ts';

const DarkModeToggle = () => {
    const { toggleDarkMode, isDarkMode } = useDarkModeContext();

    const ToggleButton = () => {
        return (
            <button
                onClick={toggleDarkMode}
                className="rounded-xl px-1 text-3xl hover:bg-white/10"
            >
                {isDarkMode ? <FaToggleOff /> : <FaToggleOn />}
            </button>
        );
    };

    const DarkModeToggle = () => {
        return (
            <>
                <BsFillMoonStarsFill className="self-center overflow-visible" />
                <ToggleButton />
                <FaSun className="self-center" />
            </>
        );
    };

    const LightToggle = () => {
        return (
            <>
                <BsMoonStars className="self-center overflow-visible" />
                <ToggleButton />
                <FaRegSun className="self-center" />
            </>
        );
    };

    return (
        <div className={`flex justify-center gap-2 text-lg text-slate-50`}>
            {isDarkMode ? <DarkModeToggle /> : <LightToggle />}
        </div>
    );
};

export default DarkModeToggle;
