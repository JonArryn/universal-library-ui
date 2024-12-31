import apiService from '../api/apiService.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface IListFields {
    [key: string]: {
        visible: boolean;
        displayName?: string;
    };
}

export interface IListPagination {
    currentPage: number;
    lastPage: number;
    perPage: number;
    currentRange: { from: number; to: number };
    total: number;
}

export interface ISortRecord {
    field: string;
    ascending: boolean;
}

interface IVisibleField {
    fieldName: string;
    displayName: string;
}

export interface IHeader {
    rowKey: string;
    displayName: string;
}

export interface IIncludeFields {
    [key: string]: { visibleFields: IVisibleField[] };
}

function useList(
    endpoint: string,
    fields: IListFields,
    defaultSort: ISortRecord,
    includeFields?: IIncludeFields
) {
    const columnsRef = useRef(fields);
    const includesRef = useRef(includeFields);

    const [listRows, setListRows] = useState<
        Record<string, any>[] | undefined
    >();
    const [listHeaders, setListHeaders] = useState<IHeader[]>([]);
    const [sortField, setSortField] = useState<ISortRecord>(defaultSort);
    const [pagination, setPagination] = useState<IListPagination | undefined>();
    const [resultsPage, setResultsPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');

    const generateSortString = useCallback(
        function () {
            if (sortField.ascending) {
                return `&sort=${sortField?.field}`;
            } else if (!sortField.ascending) {
                return `&sort=-${sortField.field}`;
            } else {
                return '';
            }
        },
        [sortField]
    );

    const buildQueryString = useCallback(
        function (): string {
            const include =
                includesRef.current && Object.keys(includesRef.current);
            const includeString = include
                ? `&include=${include.join(',')}`
                : '';
            const fields: string[] = Object.keys(columnsRef.current);
            const fieldsString = fields ? '?fields=' + fields?.join(',') : '';
            const sortString = generateSortString();
            const pageString = resultsPage ? `&page=${resultsPage}` : '';
            const searchString = search ? `&search=${search}` : '';
            return `${endpoint}${fieldsString}${includeString}${sortString}${searchString}${pageString}`;
        },
        [generateSortString, resultsPage, search, endpoint]
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

            // Process the include fields and merge into rows
            const processedRows = response.data.data.map((row: any) => {
                const updatedRow = { ...row }; // Copy the existing row data

                if (includesRef.current) {
                    for (const [includeKey, includeValue] of Object.entries(
                        includesRef.current
                    )) {
                        const includeData = row[includeKey];
                        if (includeData) {
                            includeValue.visibleFields.forEach((field) => {
                                const newKey =
                                    includeKey +
                                    field.fieldName.charAt(0).toUpperCase() +
                                    field.fieldName.slice(1); // e.g., libraryName
                                updatedRow[newKey] =
                                    includeData[field.fieldName];
                            });
                        }
                    }
                }

                return updatedRow;
            });
            setListRows(processedRows); // Update the state with processed rows
        },
        [buildQueryString]
    );

    const createListHeaderData = useCallback(function () {
        const includeColumnArr =
            includesRef.current && Object.entries(includesRef.current);

        const includesHeaderArr: IHeader[] = [];

        includeColumnArr?.forEach(([include, includeValues]) => {
            includeValues.visibleFields.forEach((field) => {
                const headerObj = {
                    rowKey:
                        include +
                        field.fieldName.charAt(0).toUpperCase() +
                        field.fieldName.slice(1),
                    displayName: field.displayName,
                };
                includesHeaderArr.push(headerObj);
            });
        });

        const columnHeaderArr: IHeader[] = [];

        Object.entries(columnsRef.current).forEach(([key, value]) => {
            if (value.visible) {
                const headerObj = {
                    rowKey: key,
                    displayName: value.displayName ? value.displayName : '',
                };
                columnHeaderArr.push(headerObj);
            }
        });

        setListHeaders([...columnHeaderArr, ...includesHeaderArr]);
    }, []);

    const changeSort = function (field: string) {
        if (field in fields) {
            if (sortField.field === field) {
                setSortField({ ...sortField, ascending: !sortField.ascending });
            } else {
                setSortField({ field, ascending: true });
            }
        }
    };

    const changePage = function (newPage: number) {
        setResultsPage(newPage);
    };

    const searchList = async function (searchValue: string) {
        setSearch(searchValue);
    };

    useEffect(() => {
        getListData();
        createListHeaderData();
    }, [createListHeaderData, getListData]);

    return {
        listRows,
        listHeaders,
        pagination,
        sortField,
        search,
        searchList,
        changeSort,
        changePage,
    };
}

export default useList;
