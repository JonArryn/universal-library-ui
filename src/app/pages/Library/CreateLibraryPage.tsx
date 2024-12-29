import PageContainer from '../../../components/layout/PageContainer.tsx';
import FormWrapper, {
    FormInputs,
} from '../../../components/form/FormWrapper.tsx';
import FormTextInputGroup from '../../../components/form/FormTextInputGroup.tsx';
import FormSubmitButton from '../../../components/form/FormSubmitButton.tsx';
import FormError from '../../../components/form/FormError.tsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import apiService from '../../../api/apiService.ts';
import { useNavigate } from 'react-router-dom';

interface ICreateLibrary extends FormInputs {
    name: string;
}

function CreateLibraryPage() {
    const navigate = useNavigate();
    const methods = useForm<ICreateLibrary>();
    const handleCreateLibrary: SubmitHandler<ICreateLibrary> = async function (
        libraryFormData
    ) {
        await apiService.post('/library', libraryFormData);
        navigate('/app/library');
    };
    return (
        <>
            <PageContainer>
                <FormProvider {...methods}>
                    <FormWrapper
                        title={'Create Library'}
                        submitHandler={handleCreateLibrary}
                    >
                        <FormTextInputGroup
                            name={'name'}
                            label={'Library Name'}
                            type={'text'}
                        />
                        <FormSubmitButton submitButtonText={'Create Library'} />
                        <FormError fieldName={'generic'} />
                    </FormWrapper>
                </FormProvider>
            </PageContainer>
        </>
    );
}

export default CreateLibraryPage;
