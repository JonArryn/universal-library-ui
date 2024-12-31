import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth.ts';
import { Link, useNavigate } from 'react-router-dom';
import FormWrapper from '../../components/form/FormWrapper.tsx';
import FormTextInputGroup from '../../components/form/FormTextInputGroup.tsx';
import FormSubmitButton from '../../components/form/FormSubmitButton.tsx';
import FormError from '../../components/form/FormError.tsx';
import { AxiosError } from 'axios';
import useFormError from '../../hooks/useFormError.ts';
import { FormInputs } from '../../components/form/FormWrapper.tsx';

export interface IRegisterUserData extends FormInputs {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    root?: { message: string };
    generic?: string;
}

function RegisterForm() {
    const methods = useForm<IRegisterUserData>();
    const { handleFormError } = useFormError<IRegisterUserData>({
        setError: methods.setError,
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister: SubmitHandler<IRegisterUserData> = async function (
        formData
    ) {
        try {
            methods.clearErrors('generic');
            await register(formData);
            navigate('/app/dashboard');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    handleFormError(error?.response?.data);
                }
            }
        }
    };
    return (
        <>
            <FormProvider {...methods}>
                <FormWrapper
                    title={'Create an Account'}
                    submitHandler={handleRegister}
                >
                    <FormTextInputGroup
                        name={'name'}
                        label={'Name'}
                        type={'text'}
                        required={true}
                    />
                    <FormTextInputGroup
                        name={'email'}
                        label={'Email Address'}
                        type={'email'}
                        required={true}
                    />
                    <FormTextInputGroup
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                        required={true}
                    />
                    <FormTextInputGroup
                        name={'password_confirmation'}
                        label={'Confirm Password'}
                        type={'password'}
                        required={true}
                    />
                    <FormSubmitButton submitButtonText={'Register'} />
                    <FormError fieldName={'generic'} />

                    <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-slate-50">
                        Already Have an Account?{' '}
                        <Link
                            to={'/login'}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Log In
                        </Link>
                    </p>
                </FormWrapper>
            </FormProvider>
        </>
    );
}

export default RegisterForm;
