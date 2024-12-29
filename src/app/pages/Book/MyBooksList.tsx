import PageContainer from '../../../components/layout/PageContainer.tsx';
import TableList from '../../../components/layout/TableList.tsx';
import useList from '../../../hooks/useList.ts';

function MyBooksList() {
    const {
        listHeaders,
        listRows,
        pagination,
        sortField,
        changeSort,
        changePage,
    } = useList(
        '/book',
        {
            id: { visible: false },
            title: { visible: true, displayName: 'Title' },
            authorName: { visible: true, displayName: 'Author' },
        },
        { field: 'title', ascending: true },

        {
            library: {
                visibleFields: [{ fieldName: 'name', displayName: 'Library' }],
            },
        }
    );
    return (
        <>
            <PageContainer>
                <TableList
                    title={'Books'}
                    description={
                        'List of books from all of your owned libraries'
                    }
                    listRows={listRows && listRows}
                    listHeaders={listHeaders}
                    pagination={pagination}
                    changePage={changePage}
                    changeSort={changeSort}
                    sortField={sortField}
                />
            </PageContainer>
        </>
    );
}

export default MyBooksList;
