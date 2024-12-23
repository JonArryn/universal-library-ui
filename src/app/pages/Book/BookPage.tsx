import PageHeading from '../../../components/PageHeading.tsx';
import { Outlet } from 'react-router-dom';

function BookPage() {
    return (
        <>
            <PageHeading />
            <Outlet />
        </>
    );
}

export default BookPage;
