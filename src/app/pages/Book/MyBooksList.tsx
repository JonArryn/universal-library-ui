import PageContainer from '../../../components/layout/PageContainer.tsx';
import ListTable from '../../../components/layout/ListTable.tsx';
import useList from '../../../hooks/useList.ts';
import PageHeading from '../../../components/PageHeading.tsx';

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
            <PageHeading
                headingTitle={'My Books'}
                primaryButton={{
                    text: '+ New Book',
                    handleClick: function () {},
                }}
            />
            <PageContainer>
                <ListTable
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
