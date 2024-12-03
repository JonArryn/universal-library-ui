import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { IRegisterUserData } from '../../providers/AuthProvider.tsx';
import FormWrapper from '../../components/form/FormWrapper.tsx';
import FormTextInputGroup from '../../components/form/FormTextInputGroup.tsx';
import FormSubmitButton from '../../components/form/FormSubmitButton.tsx';
import FormError from '../../components/form/FormError.tsx';
import { AxiosError } from 'axios';

interface Inputs extends IRegisterUserData {
    root?: { message: string };
    generic?: string;
}

function RegisterForm() {
    const methods = useForm<Inputs>();
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister: SubmitHandler<Inputs> = async function (formData) {
        try {
            methods.clearErrors('generic');
            await register(formData);
            navigate('/app');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    const errorData = error?.response?.data;
                    const formFields = Object.keys(formData) as Array<
                        keyof Inputs
                    >;
                    const errorField = formFields.find(
                        (fieldName) => fieldName in errorData.errors
                    );
                    if (errorField) {
                        methods.setError(errorField, {
                            message: errorData.message,
                        });
                    } else {
                        methods.setError('generic', {
                            type: 'custom',
                            message: errorData.message,
                        });
                    }
                }
            }
        }
    };
    return (
        <>
            <FormProvider {...methods}>
                <FormWrapper title={'Create an Account'}>
                    <form
                        className="space-y-6"
                        onSubmit={methods.handleSubmit(handleRegister)}
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
                    </form>
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
