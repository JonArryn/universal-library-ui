import React from 'react';

interface IProps {
    Icon?: React.ReactNode;
    text?: string;
    handleClick: () => void;
    style?: 'secondary' | 'primary' | 'danger';
}

const styles = {
    secondary: [
        'text-gray-900',
        'bg-white',
        'ring-gray-300',
        'hover:bg-gray-100',
    ],
    primary: [
        'text-slate-50',
        'bg-indigo-600',
        'ring-slate-400',
        'hover:bg-indigo-500',
    ],
    danger: ['text-slate-50', 'bg-red-600', 'ring-red-500', 'hover:bg-red-400'],
};

const StyledButton = ({ Icon, text, handleClick, style }: IProps) => {
    return (
        <button
            className={`${style ? styles[style].join(' ') : styles.primary.join(' ')} inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset`}
            onClick={handleClick}
        >
            {Icon && (
                <div className="size-5 items-center overflow-visible text-2xl">
                    {Icon}
                </div>
            )}
            {text}
        </button>
    );
};

export default StyledButton;
