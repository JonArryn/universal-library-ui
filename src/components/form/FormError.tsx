import { useFormContext } from 'react-hook-form';

interface IFormErrorProps {
    errorMessage?: string;
    fieldName: string;
    fieldLabel?: string;
}

function FormError({ fieldName, fieldLabel }: IFormErrorProps) {
    const {
        formState: { errors },
    } = useFormContext(); // Access form context
    return (
        <div className={`text-red-600 ${errors[fieldName] ?? 'hidden'}`}>
            {errors[fieldName]?.type === 'required' ? (
                <span className="text-xs">
                    {`The ${fieldLabel} field is required`}
                </span>
            ) : (
                <span className="text-xs">
                    {errors[fieldName]?.message?.toString()}
                </span>
            )}
        </div>
    );
}

export default FormError;
