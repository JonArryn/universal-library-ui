import PageContainer from '../../../components/layout/PageContainer.tsx';
import ListTable from '../../../components/layout/ListTable.tsx';
import useList from '../../../hooks/useList.ts';
import { useParams } from 'react-router-dom';
import PageHeading from '../../../components/PageHeading.tsx';
import { useCallback, useEffect, useState } from 'react';
import apiService from '../../../api/apiService.ts';
import { ILibrary } from '../../types/entityTypes.ts';

function ManageLibraryPage() {
    const [library, setLibrary] = useState<ILibrary>({
        id: 0,
        name: 'Library',
        userId: 0,
    });

    const params = useParams();
    const {
        listHeaders,
        listRows,
        pagination,
        sortField,
        changeSort,
        changePage,
    } = useList(
        `/library/${params.libraryId}/book`,
        {
            id: { visible: false },
            title: { visible: true, displayName: 'Title' },
            authorName: { visible: true, displayName: 'Author' },
        },
        { field: 'title', ascending: true }
    );

    const getLibraryData = useCallback(
        async function () {
            const libraryResponse = await apiService.get(
                `/library/${params.libraryId}`
            );
            setLibrary(libraryResponse.data.data);
        },
        [params.libraryId]
    );

    useEffect(() => {
        getLibraryData();
    }, [getLibraryData]);
    return (
        <>
            <PageHeading
                headingTitle={library.name}
                menuItems={[
                    { navText: 'Books', route: `/app/library/${library.id}` },
                ]}
                primaryButton={{
                    text: '+ New Book',
                    handleClick: function () {},
                }}
            />
            <PageContainer>
                <ListTable
                    title={`${library.name} Books`}
                    listHeaders={listHeaders}
                    changePage={changePage}
                    changeSort={changeSort}
                    pagination={pagination}
                    listRows={listRows}
                    sortField={sortField}
                />
            </PageContainer>
        </>
    );
}

export default ManageLibraryPage;
