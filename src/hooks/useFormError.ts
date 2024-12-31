import {
    IApiErrorResponse,
    IApiValidationErrorResponse,
} from '../api/apiService.ts';
import { Path, UseFormSetError } from 'react-hook-form';
import { FormInputs } from '../components/form/FormWrapper.tsx';

function useFormError<T extends FormInputs>({
    setError,
}: {
    setError: UseFormSetError<T>;
}) {
    const handleFormError = function (
        errorResponse: IApiErrorResponse | IApiValidationErrorResponse
    ) {
        const apiErrors = errorResponse.errors;

        // Track whether any field-specific error was set
        let hasFieldSpecificErrors = false;

        // Iterate through all errors returned by the API
        Object.keys(apiErrors).forEach((fieldName) => {
            const fieldErrors = apiErrors[fieldName];
            if (fieldErrors && fieldErrors.length > 0) {
                hasFieldSpecificErrors = true;

                // Call setError for each field
                setError(fieldName as Path<T>, {
                    type: 'manual',
                    message: fieldErrors.join(', '), // Combine all errors into a single message
                });
            }
        });

        // If no specific field errors, set the generic error
        if (!hasFieldSpecificErrors && errorResponse.message) {
            setError('generic' as Path<T>, {
                type: 'custom',
                message: errorResponse.message,
            });
        }
    };

    return { handleFormError };
}

export default useFormError;
