import StyledButton from '../StyledButton.tsx';
import { useState } from 'react';

interface ISearchFormProps {
    handleSearch: (searchValue: string) => void | Promise<void>;
}

const SearchForm = function ({ handleSearch }: ISearchFormProps) {
    const [search, setSearch] = useState<string>('');
    return (
        <div className={'flex justify-center gap-5 align-middle'}>
            <input
                id="search"
                name="text"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={'Search'}
                aria-label="Search Library Books"
                className="block basis-1/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <StyledButton
                text={'Search Library'}
                handleClick={() => handleSearch(search)}
            />
        </div>
    );
};
export default SearchForm;
