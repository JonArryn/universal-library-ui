import PageContainer from '../../../components/layout/PageContainer.tsx';
import ListTable from '../../../components/layout/ListTable.tsx';
import useList from '../../../hooks/useList.ts';
import PageHeading from '../../../components/PageHeading.tsx';
import SearchForm from '../../../components/form/SearchForm.tsx';

function MyBooksList() {
    const {
        listHeaders,
        listRows,
        pagination,
        sortField,
        searchList,
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
            <PageHeading headingTitle={'My Books'} />
            <PageContainer>
                <SearchForm handleSearch={searchList} />
                <ListTable
                    title={'Books'}
                    description={
                        'List of books from all of your owned libraries'
                    }
                    listRows={listRows && listRows}
                    listHeaders={listHeaders}
                    detailsRoute={{ route: '/app/book/id', parameter: 'id' }}
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
