import { Outlet } from 'react-router-dom';
import PageHeading from '../../../components/PageHeading.tsx';

export interface ILibrary {
    name: string;
    id: number;
    user_id: number;
}

function LibraryPage() {
    return (
        <>
            <PageHeading />
            <Outlet />
        </>
    );
}

export default LibraryPage;
