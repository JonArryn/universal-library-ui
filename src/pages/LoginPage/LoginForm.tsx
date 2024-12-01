import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormWrapper from '../../components/form/FormWrapper.tsx';
import useAuth from '../../hooks/useAuth.tsx';
import { NavLink, useNavigate } from 'react-router-dom';
import FormInput from '../../components/form/FormInput.tsx';
import FormSubmitButton from '../../components/form/FormSubmitButton.tsx';
import { AxiosError } from 'axios';
import { ILoginCredentials } from '../../providers/AuthProvider.tsx';
import FormError from '../../components/form/FormError.tsx';

interface Inputs extends ILoginCredentials {
    root?: { message: string };
    generic?: string;
}

const LoginForm = () => {
    const methods = useForm<Inputs>(); // Initialize React Hook Form
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            methods.clearErrors('generic');
            await login(data);
            navigate('/app');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    const errorData = error?.response?.data;
                    const formFields = Object.keys(data) as Array<keyof Inputs>;
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
                <FormWrapper title={'Sign In To Your Account'}>
                    <form
                        className="space-y-6"
                        onSubmit={methods.handleSubmit(handleLogin)}
                    >
                        <FormInput
                            name={'email'}
                            type={'email'}
                            label={'Email'}
                            required={true}
                        />
                        <FormInput
                            name={'password'}
                            label={'Password'}
                            type={'password'}
                            required={true}
                            subText={'Forgot Password?'}
                            subTextRoute={'/forgot-password'}
                        />
                        <FormSubmitButton submitButtonText={'Sign In'} />
                        <FormError fieldName={'generic'} />
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-slate-50">
                        Don't Have an Account?{' '}
                        <NavLink
                            to={'/register'}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Register Today
                        </NavLink>
                    </p>
                </FormWrapper>
            </FormProvider>
        </>
    );
};

export default LoginForm;
