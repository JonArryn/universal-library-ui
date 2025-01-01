import { useFormContext } from 'react-hook-form';
import apiService from '../../api/apiService.ts';
import { useCallback, useEffect, useState } from 'react';
import FormError from './FormError.tsx';
import { HiChevronDown } from 'react-icons/hi2';

interface ISelectOptionFormGroupProps {
    name: string;
    label: string;
    optionEndpoint: string;
    required?: boolean;
    subText?: string;
    subTextRoute?: string;
    preSelectedId?: string | number;
    disabled?: boolean;
}

interface IApiRecord {
    id: number | string;
    name?: string;
    title?: string;
}

function SelectOptionFormGroup({
    name,
    label,
    required,
    optionEndpoint,
    preSelectedId,
    disabled,
    subText,
    subTextRoute,
}: ISelectOptionFormGroupProps) {
    const [options, setOptions] = useState<[] | undefined>();

    const { register, setValue, ...rest } = useFormContext(); // Access form context
    const getOptions = useCallback(
        async function () {
            const response = await apiService.get(`${optionEndpoint}`);
            setOptions(response.data.data);
            if (preSelectedId) {
                setValue(name, preSelectedId);
            }
        },
        [optionEndpoint, preSelectedId]
    );

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    useEffect(() => {
        if (preSelectedId) {
            setValue(name, preSelectedId);
        }
    }, [options]);

    const SubTextField = function () {
        return (
            <p className="font-semibold text-indigo-600 hover:text-indigo-500">
                {subText}
            </p>
        );
    };

    const SubTextLink = function () {
        return (
            <a
                href={subTextRoute}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
                {subText}
            </a>
        );
    };
    return (
        <>
            <div className="flex justify-between text-sm/6 font-medium text-gray-900">
                <label
                    htmlFor={name}
                    className="block text-sm/6 font-medium text-gray-900 dark:text-slate-50"
                >
                    {label}
                </label>
                <FormError fieldName={name} fieldLabel={label} />
            </div>
            <div className="mt-2 grid grid-cols-1">
                <select
                    {...register(name, { required: required })}
                    {...rest}
                    id={name}
                    disabled={disabled}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:bg-slate-400 disabled:text-slate-500 sm:text-sm/6"
                >
                    {options?.map((option: IApiRecord) => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <HiChevronDown className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                <div className="mt-2 text-sm">
                    {subTextRoute ? <SubTextLink /> : <SubTextField />}
                </div>
            </div>
        </>
    );
}

export default SelectOptionFormGroup;
