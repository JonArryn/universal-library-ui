const MobileNav = () => {
    return (
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {/*/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/}
            <a
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"
            >
                Dashboard
            </a>
            <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
                Team
            </a>
        </div>
    );
};

export default MobileNav;
