import { useFormContext } from 'react-hook-form';
import FormError from './FormError.tsx';

type InputTypes = 'text' | 'email' | 'password' | 'tel';

interface IFormInputProps {
    name: string;
    label: string;
    type: InputTypes;
    required?: boolean;
    placeholder?: string;
    subText?: string;
    subTextRoute?: string;
}

function FormTextInputGroup({
    name,
    label,
    type = 'text',
    required = false,
    placeholder = '',
    subText = '',
    subTextRoute = '',
}: IFormInputProps) {
    const { register } = useFormContext(); // Access form context

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
        <div>
            <div className="flex items-center justify-between">
                <label
                    htmlFor={name}
                    className="block text-sm/6 font-medium text-gray-900 dark:text-slate-50"
                >
                    {label}
                </label>
                <FormError fieldName={name} fieldLabel={label} />
            </div>

            <div className="mt-2">
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name, { required: required })}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    // onChange={() => clearErrors('generic')}
                />
            </div>
            <div className="mt-2 text-sm">
                {subTextRoute ? <SubTextLink /> : <SubTextField />}
            </div>
        </div>
    );
}

export default FormTextInputGroup;
