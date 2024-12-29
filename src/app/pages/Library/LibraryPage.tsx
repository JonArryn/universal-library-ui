import { Outlet } from 'react-router-dom';

export interface ILibrary {
    name: string;
    id: number;
    user_id: number;
}

function LibraryPage() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default LibraryPage;
