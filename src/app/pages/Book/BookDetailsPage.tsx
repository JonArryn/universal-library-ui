import PageContainer from '../../../components/layout/PageContainer.tsx';
import PageHeading from '../../../components/PageHeading.tsx';
import apiService from '../../../api/apiService.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IBookWithLibrary } from '../../types/entityTypes.ts';
import StyledButton from '../../../components/StyledButton.tsx';

function BookDetailsPage() {
    const [bookDetails, setBookDetails] = useState<
        IBookWithLibrary | undefined
    >();
    const params = useParams();
    const navigate = useNavigate();

    const getBookDetails = async function () {
        const bookResponse = await apiService.get(
            `/book/${params.bookId}?include=library`
        );
        setBookDetails(bookResponse.data.data);
    };

    const ListItem = ({
        title,
        description,
    }: {
        title: string;
        description: string;
    }) => (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">{title}</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {description}
            </dd>
        </div>
    );

    const handleEditClick = function () {
        navigate(`/app/book/${params.bookId}/edit`);
    };

    useEffect(() => {
        getBookDetails();
    }, []);
    return (
        <div>
            <PageHeading headingTitle={'Book Details'} />
            <PageContainer>
                <div className={'mx-auto w-1/2'}>
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="flex justify-between px-4 py-6 sm:px-6">
                            <h3 className="text-base/7 font-semibold text-gray-900">
                                {bookDetails
                                    ? bookDetails.title
                                    : 'Book Details'}
                            </h3>
                            <div className={'flex gap-5'}>
                                <StyledButton
                                    text={'Edit'}
                                    handleClick={handleEditClick}
                                />
                                <StyledButton
                                    text={'Delete'}
                                    style={'danger'}
                                />
                            </div>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                {bookDetails && (
                                    <div>
                                        <ListItem
                                            title={'Title'}
                                            description={bookDetails.title}
                                        />
                                        <ListItem
                                            title={'Author'}
                                            description={bookDetails.authorName}
                                        />
                                        <ListItem
                                            title={'Description'}
                                            description={
                                                bookDetails.description
                                            }
                                        />
                                        <ListItem
                                            title={'Library'}
                                            description={
                                                bookDetails.library.name
                                            }
                                        />
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}

export default BookDetailsPage;