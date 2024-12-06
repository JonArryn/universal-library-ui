import DarkModeToggle from './DarkModeToggle.tsx';

interface IPageHeadingProps {
    headingText: string | undefined;
}

const PageHeading = ({ headingText }: IPageHeadingProps) => {
    return (
        <header className="bg-white shadow dark:bg-slate-800">
            <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                    {headingText}
                </h1>
                <DarkModeToggle />
            </div>
        </header>
    );
};

export default PageHeading;
