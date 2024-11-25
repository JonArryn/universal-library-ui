const MobileMenuButton = () => {
    const OpenMenuButton = () => {
        return (
            <>
                {/*{!--Menu open: "hidden", Menu closed: "block" --}*/}
                <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </>
        );
    };
    // const CloseMenuButton = () => {
    //     return (
    //         <>
    //             {/*/* <!-- Menu open: "block", Menu closed: "hidden" -->*/}
    //             <svg
    //                 className="hidden size-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //                 data-slot="icon"
    //             >
    //                 <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M6 18 18 6M6 6l12 12"
    //                 />
    //             </svg>
    //         </>
    //     );
    // };
    return (
        <div className="-mr-2 flex md:hidden">
            {/*/*<!-- Mobile menu button -->*/}
            <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <OpenMenuButton />
            </button>
        </div>
    );
};

export default MobileMenuButton;
