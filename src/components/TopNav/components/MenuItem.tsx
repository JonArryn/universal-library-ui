interface IMenuItemLinkProps {
    text: string;
    tabIndex?: number;
    handleClick?: () => void | Promise<void>;
}

function MenuItem({ text, tabIndex, handleClick }: IMenuItemLinkProps) {
    return (
        <div
            className="block px-4 py-2 text-sm hover:cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"
            role="menuitem"
            tabIndex={tabIndex}
            id={`user-menu-item-${tabIndex}`}
            onClick={handleClick}
        >
            {text}
        </div>
    );
}

export default MenuItem;
