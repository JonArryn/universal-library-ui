import React from 'react';

interface IProps {
    Icon?: React.ReactNode;
    text?: string;
    handleClick?: () => void;
    style?: 'primary' | 'secondary' | 'new' | 'danger';
}

const styles = {
    primary: [
        'text-slate-50',
        'bg-indigo-600',
        'ring-slate-400',
        'hover:bg-indigo-500',
    ],
    secondary: [
        'text-gray-900',
        'bg-white',
        'ring-gray-300',
        'hover:bg-gray-100',
    ],
    new: [
        'dark:text-slate-50',
        'text-slate-800',
        'dark:bg-fuchsia-500',
        'bg-fuchsia-400',
        'dark:ring-slate-50',
        'ring-slate-800',
        'dark:hover:bg-fuchsia-400',
        'hover:bg-fuchsia-500',
    ],
    danger: ['text-slate-50', 'bg-red-600', 'ring-red-500', 'hover:bg-red-400'],
};

const StyledButton = ({ Icon, text, handleClick, style }: IProps) => {
    return (
        <button
            className={`${style ? styles[style].join(' ') : styles.primary.join(' ')} inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset`}
            onClick={(e) => {
                e.stopPropagation();
                if (handleClick) handleClick();
            }}
        >
            {Icon && (
                <div className="flex items-center justify-center text-2xl">
                    <span className={'text-center align-middle'}>{Icon}</span>
                </div>
            )}
            {text}
        </button>
    );
};

export default StyledButton;
