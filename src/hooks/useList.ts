import apiService from '../api/apiService.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface IListColumns {
    [key: string]: { visible: boolean; displayName?: string };
}

export interface IListPagination {
    currentPage: number;
    lastPage: number;
    perPage: number;
    currentRange: { from: number; to: number };
    total: number;
}

function useList(
    endpoint: string,
    columns: IListColumns,
    defaultSortField?: string,
    defaultSortDirection?: 'asc' | 'desc'
) {
    const columnsRef = useRef(columns);

    const [columnRows, setColumnRows] = useState<
        Record<string, any>[] | undefined
    >();
    const [sortField, setSortField] = useState<string | undefined>(
        defaultSortField
            ? defaultSortDirection === 'desc'
                ? `-${defaultSortField}`
                : defaultSortField
            : undefined
    );
    const [pagination, setPagination] = useState<IListPagination | undefined>();
    const [resultsPage, setResultsPage] = useState<number>(1);

    const buildQueryString = useCallback(
        function (): string {
            const fields: string[] = Object.keys(columnsRef.current);
            const fieldsString = fields ? '?fields=' + fields?.join(',') : '';
            const sortString = sortField ? `&sort=${sortField}` : '';
            const pageString = resultsPage ? `&page=${resultsPage}` : '';

            return `${endpoint}${fieldsString}${sortString}${pageString}`;
        },
        [resultsPage, sortField, endpoint]
    );

    const getListData = useCallback(
        async function () {
            const queryString = buildQueryString();
            const response = await apiService.get(queryString);

            setPagination({
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                perPage: response.data.meta.per_page,
                total: response.data.meta.total,
                currentRange: {
                    from: response.data.meta.from,
                    to: response.data.meta.to,
                },
            });
            setColumnRows(response.data.data);
        },
        [buildQueryString]
    );

    const changeSort = function (field: string) {
        if (field in columns) {
            if (sortField === field) {
                setSortField(`-${field}`);
            } else {
                setSortField(field);
            }
        }
    };

    const changePage = function (newPage: number) {
        setResultsPage(newPage);
    };

    useEffect(() => {
        getListData();
    }, [getListData]);

    return {
        columns: columnsRef.current,
        columnRows,
        pagination,
        sortField,
        changeSort,
        changePage,
    };
}

export default useList;
