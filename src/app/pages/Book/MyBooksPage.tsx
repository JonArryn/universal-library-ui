import PageContainer from '../../../components/layout/PageContainer.tsx';
import TableList from '../../../components/layout/TableList.tsx';
import useList from '../../../hooks/useList.ts';

function MyBooksPage() {
    const { columns, columnRows, pagination, changeSort, changePage } = useList(
        '/api/book',
        {
            id: { visible: false },
            title: { visible: true, displayName: 'Title' },
            authorName: { visible: true, displayName: 'Author' },
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
                    tableHeaders={columns}
                    pagination={pagination}
                    listRows={columnRows && columnRows}
                    changePage={changePage}
                    changeSort={changeSort}
                />
            </PageContainer>
        </>
    );
}

export default MyBooksPage;
