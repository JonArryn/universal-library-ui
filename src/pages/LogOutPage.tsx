import ContentHeading from '../components/typography/ContentHeading.tsx';
import { Link } from 'react-router-dom';

function LogOutPage() {
    return (
        <div className={'container mx-auto space-y-3 px-4'}>
            <ContentHeading text={"You've been logged out"} />
            <Link to={'/'} className={'block text-indigo-500 hover:underline'}>
                Go Home
            </Link>
        </div>
    );
}

export default LogOutPage;
