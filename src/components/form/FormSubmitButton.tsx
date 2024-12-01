interface IFormButtonProps {
    submitButtonText: string;
}

const FormSubmitButton = ({ submitButtonText }: IFormButtonProps) => {
    return (
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {submitButtonText}
        </button>
    );
};

export default FormSubmitButton;
