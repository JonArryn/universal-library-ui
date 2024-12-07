import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormWrapper from '../../components/form/FormWrapper.tsx';
import useAuth from '../../hooks/useAuth.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import FormTextInputGroup from '../../components/form/FormTextInputGroup.tsx';
import FormSubmitButton from '../../components/form/FormSubmitButton.tsx';
import { AxiosError } from 'axios';
import { FormInputs } from '../../components/form/FormWrapper.tsx';

interface ILoginCredentials extends FormInputs {
    email: string;
    password: string;
}

const LoginForm = () => {
    const methods = useForm<ILoginCredentials>();

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<ILoginCredentials> = async (
        formData: ILoginCredentials
    ) => {
        try {
            await login(formData);
            navigate('/app');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    methods.setError('generic', {
                        message: 'Could not log in.',
                    });
                }
            }
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <FormWrapper
                    title={'Sign In To Your Account'}
                    formClasses={['space-y-6']}
                    submitHandler={handleLogin}
                >
                    <FormTextInputGroup
                        name={'email'}
                        type={'email'}
                        label={'Email'}
                        required={true}
                    />
                    <FormTextInputGroup
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                        required={true}
                        subText={'Forgot Password?'}
                        subTextRoute={'/forgot-password'}
                    />
                    <FormSubmitButton submitButtonText={'Sign In'} />
                </FormWrapper>
                <p className="text-center text-sm/6 text-gray-500 dark:text-slate-50">
                    Don't Have an Account?{' '}
                    <NavLink
                        to={'/register'}
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Register Today
                    </NavLink>
                </p>
            </FormProvider>
        </>
    );
};

export default LoginForm;
