import PageContainer from '../../../components/layout/PageContainer.tsx';
import ContentHeading from '../../../components/typography/ContentHeading.tsx';
import FormWrapper from '../../../components/form/FormWrapper.tsx';
import FormTextInputGroup from '../../../components/form/FormTextInputGroup.tsx';
import { useEffect, useState } from 'react';
import { IBook, IBookWithLibrary } from '../../types/entityTypes.ts';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useFormError from '../../../hooks/useFormError.ts';
import { IRegisterUserData } from '../../../pages/RegisterPage/RegisterForm.tsx';
import { AxiosError } from 'axios';
import apiService from '../../../api/apiService.ts';
import { useNavigate, useParams } from 'react-router-dom';
import FormTextAreaGroup from '../../../components/form/FormTextAreaGroup.tsx';
import SelectOptionFormGroup from '../../../components/form/SelectOptionFormGroup.tsx';
import FormSubmitButton from '../../../components/form/FormSubmitButton.tsx';
import FormError from '../../../components/form/FormError.tsx';

function EditBookPage() {
    const [book, setBook] = useState<IBookWithLibrary | undefined>();
    const params = useParams();
    const navigate = useNavigate();
    const methods = useForm<IRegisterUserData>();
    const { handleFormError } = useFormError<IRegisterUserData>({
        setError: methods.setError,
    });

    const getBookData = async function () {
        const bookResponse = await apiService.get(`/book/${params.bookId}`);
        setBook(bookResponse.data.data);
    };

    const handleEditBook: SubmitHandler<IBook> = async function (formData) {
        try {
            methods.clearErrors('generic');
            await apiService.put(`/book/${book?.id}`, { ...book, ...formData });
            navigate(`/app/book/${book?.id}`);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status < 500) {
                    handleFormError(error?.response?.data);
                }
            }
        }
    };

    useEffect(() => {
        getBookData();
    }, []);

    return (
        <PageContainer>
            <ContentHeading text={'Edit Book'} />
            <FormProvider {...methods}>
                <FormWrapper title={'Edit Book'} submitHandler={handleEditBook}>
                    {book && (
                        <div>
                            <FormTextInputGroup
                                name={'title'}
                                label={'Title'}
                                type={'text'}
                                defaultValue={book.title}
                            />
                            <FormTextInputGroup
                                name={'authorName'}
                                label={'Author'}
                                type={'text'}
                                defaultValue={book.authorName}
                            />
                            <FormTextAreaGroup
                                name={'description'}
                                label={'Description'}
                                type={'textarea'}
                                defaultValue={book.description}
                            />
                            <SelectOptionFormGroup
                                name={'libraryId'}
                                label={'Library'}
                                optionEndpoint={`/library`}
                                preSelectedId={book.libraryId}
                                disabled={false}
                            />
                        </div>
                    )}
                    <FormSubmitButton submitButtonText={'Save Book'} />
                    <FormError fieldName={'generic'} />
                </FormWrapper>
            </FormProvider>
        </PageContainer>
    );
}

export default EditBookPage;
