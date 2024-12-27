import StyledButton from '../StyledButton.tsx';
import Paginator from '../Paginator.tsx';
import {
    IListColumns,
    IListPagination,
    ISortRecord,
} from '../../hooks/useList.ts';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

export interface ITableHeader {
    field: string;
    header: string;
}

interface ITableListProps {
    title: string;
    description?: string;
    sortField?: ISortRecord | undefined;
    tableHeaders: IListColumns;
    pagination?: IListPagination;
    listRows?: Record<string, any>;
    changePage: (arg0: number) => void;
    changeSort: (arg0: string) => void;
}

function TableList({
    title,
    description,
    sortField,
    tableHeaders,
    listRows,
    pagination,
    changePage,
    changeSort,
}: ITableListProps) {
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
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <StyledButton text={'+ New Record'} style={'new'} />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                                <thead className="bg-gray-50 dark:bg-slate-800">
                                    <tr>
                                        {Object.entries(tableHeaders)?.map(
                                            ([field, fieldConfig], index) =>
                                                fieldConfig.visible && (
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-slate-50"
                                                        key={index * -1}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                changeSort(
                                                                    field
                                                                )
                                                            }
                                                            className={
                                                                'flex gap-2'
                                                            }
                                                        >
                                                            {
                                                                fieldConfig.displayName
                                                            }
                                                            {sortField?.field ==
                                                                field && (
                                                                <span
                                                                    className={
                                                                        'self-center'
                                                                    }
                                                                >
                                                                    {sortField.ascending ? (
                                                                        <HiChevronUp />
                                                                    ) : (
                                                                        <HiChevronDown />
                                                                    )}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </th>
                                                )
                                        )}
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-slate-50"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:bg-slate-600">
                                    {listRows?.map(
                                        (
                                            row: Record<string, any>,
                                            rowIndex: number
                                        ) => (
                                            <tr key={`row-${rowIndex}`}>
                                                {Object.entries(row).map(
                                                    ([key, value]) => (
                                                        <td
                                                            className="max-w-10 whitespace-nowrap text-sm font-medium text-gray-900 sm:pl-6 dark:text-slate-50"
                                                            hidden={
                                                                !tableHeaders[
                                                                    key
                                                                ].visible
                                                            }
                                                            key={key}
                                                        >
                                                            {value !==
                                                                undefined &&
                                                            value !== null
                                                                ? String(value)
                                                                : '-'}
                                                        </td>
                                                    )
                                                )}
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 dark:text-slate-50">
                                                    Edit
                                                </td>
                                            </tr>
                                        )
                                    )}
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

export default TableList;
