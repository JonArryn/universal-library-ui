import { useEffect, useState } from 'react';
import apiService from '../../api/apiService.ts';
import PageContainer from '../../components/layout/PageContainer.tsx';

interface ILibraryBookCount {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    books_count: number;
}

const DashboardPage = () => {
    const [libraries, setLibraries] = useState<ILibraryBookCount[] | []>([]);

    const getBookCountReport = async function () {
        const reportResponse = await apiService.get('/report/libraryBookCount');
        setLibraries(reportResponse.data.data);
    };

    useEffect(() => {
        getBookCountReport();
    }, []);
    return (
        <PageContainer>
            <div className="mx-auto w-1/2">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-xl bg-gray-50 py-10 shadow-md dark:bg-gray-900 dark:shadow-lg dark:shadow-black">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="text-gray-900 sm:flex sm:items-center dark:text-slate-50">
                                <div className="sm:flex-auto">
                                    <h1 className="font-semibold">
                                        Library Book Count Report
                                    </h1>
                                    <p className="mt-2 text-sm">
                                        A report listing the total count of
                                        books in each of your libraries
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0 dark:text-slate-50"
                                                    >
                                                        Library Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold dark:text-slate-50"
                                                    >
                                                        Book Count
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {libraries?.map((library) => (
                                                    <tr key={library.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 dark:text-slate-100">
                                                            {library.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-slate-100">
                                                            {
                                                                library.books_count
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default DashboardPage;
