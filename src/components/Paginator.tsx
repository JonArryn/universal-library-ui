import { HiChevronRight } from 'react-icons/hi';
import { HiChevronLeft } from 'react-icons/hi';
import TextContent from './typography/TextContent.tsx';
import React, { ChangeEvent } from 'react';
import { IListPagination } from '../hooks/useList.ts';

interface IPaginatorProps extends IListPagination {
    changePage: (arg0: number) => void;
    changeSort: (arg0: string) => void;
}

function Paginator({
    currentPage,
    lastPage,
    total,
    changePage,
    currentRange,
}: IPaginatorProps) {
    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= lastPage) {
            changePage(value);
        }
    };
    const handlePrevious = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < lastPage) {
            changePage(currentPage + 1);
        }
    };

    const PageSelect = function (): React.ReactNode {
        const pageNumberArr: number[] = [];
        const generateOptions = function () {
            for (let i = 1; i <= lastPage; i++) {
                pageNumberArr.push(i);
            }
        };
        generateOptions();
        return (
            <select
                className={'overflow-auto px-4'}
                onChange={(e) => handleInputChange(e)}
                name={'pageSelect'}
                value={currentPage}
            >
                {pageNumberArr.map((page) => (
                    <option value={page} key={page}>
                        {page}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <div className="flex items-center justify-between rounded-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-800">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-slate-600 dark:text-slate-50"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === lastPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-slate-600 dark:text-slate-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-slate-50">
                        Showing{' '}
                        <span className="font-medium">{currentRange.from}</span>{' '}
                        to{' '}
                        <span className="font-medium">{currentRange.to}</span>{' '}
                        of <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate flex items-stretch justify-between space-x-px rounded-md shadow-sm"
                    >
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <HiChevronLeft
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                        <div className={'flex space-x-4 px-2'}>
                            <div className={'self-center'}>
                                <TextContent text={'Page'} />
                            </div>
                            <PageSelect />
                            <div className={'self-center'}>
                                <TextContent text={'of'} />
                            </div>
                            <div className={'self-center'}>
                                <TextContent text={lastPage} />
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === lastPage}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <HiChevronRight
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Paginator;
