import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormWrapper, {
    FormInputs,
} from '../../../components/form/FormWrapper.tsx';
import FormTextInputGroup from '../../../components/form/FormTextInputGroup.tsx';
import FormSubmitButton from '../../../components/form/FormSubmitButton.tsx';
import FormError from '../../../components/form/FormError.tsx';
import useFormError from '../../../hooks/useFormError.ts';
import { AxiosError } from 'axios';
import apiService from '../../../api/apiService.ts';
import { useNavigate, useParams } from 'react-router-dom';
import SelectOptionFormGroup from '../../../components/form/SelectOptionFormGroup.tsx';
import PageHeading from '../../../components/PageHeading.tsx';
import { useEffect, useState } from 'react';
import { ILibrary } from '../../types/entityTypes.ts';

interface ICreateLibraryBook extends FormInputs {
    title: string;
    author: string;
    description?: string;
    libraryId: number;
}

function NewLibraryBookPage() {
    const [library, setLibrary] = useState<ILibrary | undefined>();

    const navigate = useNavigate();
    const params = useParams();
    const methods = useForm<ICreateLibraryBook>();
    const { handleFormError } = useFormError<ICreateLibraryBook>({
        setError: methods.setError,
    });

    const handleCreateBook: SubmitHandler<ICreateLibraryBook> = async function (
        formData
    ) {
        try {
            await apiService.post(
                `/library/${params.libraryId}/book`,
                formData
            );
            navigate(`/app/library/${params.libraryId}`);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    handleFormError(error?.response?.data);
                }
            }
        }
    };

    const getLibrary = async function () {
        const response = await apiService.get(`/library/${params.libraryId}`);
        setLibrary(response.data.data);
    };

    useEffect(() => {
        getLibrary();
    }, []);

    return (
        <>
            <PageHeading
                headingTitle={`${library?.name}`}
                menuItems={[
                    {
                        navText: '<- Back to Library',
                        route: `/app/library/${params.libraryId}`,
                    },
                    {
                        navText: 'New Library Book',
                        route: `/app/library/${params.libraryId}/book/create`,
                    },
                ]}
            />
            <FormProvider {...methods}>
                <FormWrapper
                    title={'Create Library Book'}
                    submitHandler={handleCreateBook}
                >
                    <FormTextInputGroup
                        name={'title'}
                        label={'Title'}
                        type={'text'}
                    />
                    <FormTextInputGroup
                        name={'authorName'}
                        label={'Author Name'}
                        type={'text'}
                    />
                    <FormTextInputGroup
                        name={'description'}
                        label={'Book Description'}
                        type={'text'}
                    />
                    <SelectOptionFormGroup
                        name={'libraryId'}
                        label={'Library'}
                        optionEndpoint={`/library`}
                        preSelectedId={params.libraryId}
                        disabled={true}
                    />
                    <FormSubmitButton submitButtonText={'Save Book'} />
                    <FormError fieldName={'generic'} />
                </FormWrapper>
            </FormProvider>
        </>
    );
}

export default NewLibraryBookPage;
