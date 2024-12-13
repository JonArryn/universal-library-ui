import { ILibrary } from '../LibraryPage.tsx';
import StyledButton from '../../../../components/StyledButton.tsx';

interface ILibraryCardProps {
    library: ILibrary;
}

function LibraryCard({ library }: ILibraryCardProps) {
    return (
        <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <div className="flex items-center justify-between px-4 py-5 sm:px-6">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {library.name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Library Details
                    </p>
                </div>
                <div>
                    <StyledButton text={'Manage'} />
                </div>
            </div>

            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Owner
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Library User
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Created
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Created At Date
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default LibraryCard;
