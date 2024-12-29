import PageContainer from '../../../components/layout/PageContainer.tsx';
import TableList from '../../../components/layout/TableList.tsx';
import useList from '../../../hooks/useList.ts';
import { useParams } from 'react-router-dom';

function ManageLibraryPage() {
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
    return (
        <PageContainer>
            <TableList
                title={'Library Books'}
                listHeaders={listHeaders}
                changePage={changePage}
                changeSort={changeSort}
                pagination={pagination}
                listRows={listRows}
                sortField={sortField}
            />
        </PageContainer>
    );
}

export default ManageLibraryPage;
