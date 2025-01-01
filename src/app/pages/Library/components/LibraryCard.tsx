import { ILibrary } from '../LibraryPage.tsx';
import StyledButton from '../../../../components/StyledButton.tsx';
import { useNavigate } from 'react-router-dom';

interface ILibraryCardProps {
    library: ILibrary;
}

function LibraryCard({ library }: ILibraryCardProps) {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-none dark:bg-gray-900 dark:shadow-xl dark:shadow-black">
            <div className="flex items-center justify-between gap-5 px-4 py-5 sm:px-6">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-50">
                        {library.name}
                    </h3>
                </div>
                <div>
                    <StyledButton
                        text={'Manage'}
                        handleClick={() =>
                            navigate(`/app/library/${library.id}`)
                        }
                    />
                </div>
            </div>

            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-600">
                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-50">
                            Owner
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-slate-100">
                            Library User
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-slate-50">
                            Created
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-slate-100">
                            Created At Date
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default LibraryCard;
