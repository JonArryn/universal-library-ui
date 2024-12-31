import Paginator from '../Paginator.tsx';
import {
    IHeader,
    IIncludeFields,
    IListPagination,
    ISortRecord,
} from '../../hooks/useList.ts';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

export interface ITableHeader {
    field: string;
    header: string;
}

interface ITableListProps {
    title: string;
    description?: string;
    listRows?: Record<string, any>;
    listHeaders: IHeader[];
    sortField?: ISortRecord | undefined;
    pagination?: IListPagination;
    includeColumns?: IIncludeFields;
    detailsRoute: { route: string; parameter: string };
    changePage: (arg0: number) => void;
    changeSort: (arg0: string) => void;
}

function ListTable({
    title,
    description,
    sortField,
    listRows,
    listHeaders,
    detailsRoute,
    pagination,
    changePage,
    changeSort,
}: ITableListProps) {
    const TableHeaderRow = function () {
        return (
            <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                    {listHeaders.map((header, index) => (
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-slate-50"
                            key={index * -1}
                        >
                            <button
                                onClick={() => changeSort(header.rowKey)}
                                className={'flex gap-2'}
                            >
                                {header.displayName}
                                {sortField?.field == header.rowKey && (
                                    <span className={'self-center'}>
                                        {sortField.ascending ? (
                                            <HiChevronUp />
                                        ) : (
                                            <HiChevronDown />
                                        )}
                                    </span>
                                )}
                            </button>
                        </th>
                    ))}
                    <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-slate-50"
                    ></th>
                </tr>
            </thead>
        );
    };

    const TableRows = function () {
        const rowKeys =
            listHeaders && listHeaders.map((header) => header.rowKey);
        return listRows?.map((row: Record<string, any>, rowIndex: number) => (
            <tr key={`row-${rowIndex}`}>
                {Object.entries(row).map(([key, value]) => (
                    <td
                        className="w-1/3 whitespace-nowrap text-sm font-medium sm:pl-6 dark:text-slate-50"
                        hidden={!rowKeys.includes(key)}
                        key={key}
                    >
                        {value !== undefined && value !== null
                            ? String(value)
                            : '-'}
                    </td>
                ))}
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 hover:text-blue-400 sm:pl-6 dark:text-cyan-400">
                    <Link
                        to={detailsRoute?.route.replace(
                            detailsRoute?.parameter,
                            row[detailsRoute?.parameter]
                        )}
                    >
                        Details
                    </Link>
                </td>
            </tr>
        ));
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 dark:text-slate-50">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-slate-50">
                        {description}
                    </p>
                </div>
            </div>
            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                                <TableHeaderRow />
                                <tbody className="divide-y divide-gray-200 bg-white dark:bg-slate-600">
                                    <TableRows />
                                </tbody>
                            </table>
                        </div>
                        <div className={'mt-3'}>
                            {pagination && (
                                <Paginator
                                    currentPage={pagination.currentPage}
                                    lastPage={pagination.lastPage}
                                    perPage={pagination.perPage}
                                    total={pagination.total}
                                    changePage={changePage}
                                    changeSort={changeSort}
                                    currentRange={pagination.currentRange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListTable;
