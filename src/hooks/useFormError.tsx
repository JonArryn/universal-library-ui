import {
    IApiErrorResponse,
    IApiValidationErrorResponse,
} from '../api/apiService.ts';
import { Path, UseFormSetError } from 'react-hook-form';
import { FormInputs } from '../components/form/FormWrapper.tsx';

interface IUseFormErrorProps<T extends FormInputs> {
    formData: T;
    setError: UseFormSetError<T>;
}

function useFormError<T extends FormInputs>({
    formData,
    setError,
}: IUseFormErrorProps<T>) {
    const handleFormError = function (
        errorResponse: IApiErrorResponse | IApiValidationErrorResponse
    ) {
        const formFields = Object.keys(formData) as Array<keyof T>;

        formFields.forEach((fieldName) => {
            if (fieldName in errorResponse.errors) {
                const errorMessages =
                    errorResponse.errors[fieldName as string].join(', ');
                setError(fieldName as Path<T>, {
                    message: errorMessages,
                });
            }
        });

        const hasFieldSpecificErrors = formFields.some(
            (fieldName) => fieldName in errorResponse.errors
        );
        if (!hasFieldSpecificErrors) {
            setError('generic' as Path<T>, {
                type: 'custom',
                message: errorResponse.message,
            });
        }
    };
    return { handleFormError };
}

export default useFormError;
