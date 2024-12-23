import DarkModeToggle from './DarkModeToggle.tsx';
import NavigationLink from './TopNav/components/NavigationLink.tsx';
import useHeading from '../hooks/useHeading.ts';

const PageHeading = () => {
    const { headingTitle, menuItems } = useHeading();

    return (
        <header className="bg-white shadow dark:bg-slate-800">
            <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8">
                <div className={'flex'}>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                        {headingTitle}
                    </h1>
                    <div className={'ml-6 flex justify-between'}>
                        {menuItems &&
                            menuItems.map((navItem) => (
                                <NavigationLink
                                    path={navItem.route}
                                    text={navItem.navText}
                                    key={navItem.navText}
                                />
                            ))}
                    </div>
                </div>

                <DarkModeToggle />
            </div>
        </header>
    );
};

export default PageHeading;
