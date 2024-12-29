import NavigationLink from './TopNav/components/NavigationLink.tsx';
import { INavItem } from '../Constants/navItems.ts';
import StyledButton from './StyledButton.tsx';

interface IButton {
    text: string;
    handleClick: () => void | Promise<void>;
}

interface IPageHeadingProps {
    headingTitle: string;
    menuItems?: INavItem[];
    primaryButton?: IButton;
    secondaryButton?: string;
}

const PageHeading = ({
    headingTitle,
    menuItems,
    primaryButton,
}: IPageHeadingProps) => {
    return (
        <header className="bg-white shadow dark:bg-slate-800">
            <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8">
                <div className={'flex justify-between'}>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                        {headingTitle}
                    </h1>
                    <div className={'ml-6 flex'}>
                        {menuItems &&
                            menuItems.map((navItem, index) => (
                                <div
                                    className={`${navItem.hidden && 'hidden'}`}
                                    key={index * -1}
                                >
                                    <NavigationLink
                                        path={navItem.route}
                                        text={navItem.navText}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    {primaryButton && (
                        <StyledButton
                            style={'new'}
                            text={primaryButton.text}
                            handleClick={primaryButton.handleClick}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default PageHeading;
