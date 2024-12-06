import React from 'react';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import FormError from './FormError.tsx';

type AnyInput = Record<string, any>;

export interface FormInputs extends AnyInput {
    root?: { message: string };
    generic?: string;
}

interface IFormWrapperProps<T extends FieldValues> {
    Logo?: React.ReactNode;
    title: string;
    children: React.ReactNode;
    submitHandler: SubmitHandler<T>;
    formClasses?: string[];
}

// TODO: make the form wrapper component more flexible or rename it appropriately

// This is a narrow-width stack styling only form wrapper typically used for login or registration
// not ideal for complex forms that are wide and have multiple inputs in the same row
// All forms need to be wrapped in a <FormProvider> from react hook form, see docs on using it.
// https://react-hook-form.com/docs/formprovider

function FormWrapper<T extends FieldValues>({
    Logo,
    title,
    children,
    submitHandler,
    formClasses,
}: IFormWrapperProps<T>) {
    const { handleSubmit } = useFormContext<T>();

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {Logo && <div className="mx-auto h-10 w-auto">{Logo}</div>}
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-slate-50">
                    {title}
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className={formClasses && formClasses.join('')}
                    onSubmit={handleSubmit(submitHandler)}
                >
                    {children}
                </form>
                <div className="mx-auto mt-5 max-w-max">
                    <FormError fieldName={'generic'} />
                </div>
            </div>
        </div>
    );
}

export default FormWrapper;
