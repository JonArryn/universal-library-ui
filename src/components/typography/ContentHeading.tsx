interface IContentHeadingProps {
    text: string;
}

function ContentHeading({ text }: IContentHeadingProps) {
    return (
        <h2
            className={
                'text-xl font-medium tracking-tight text-gray-900 dark:text-slate-100'
            }
        >
            {text}
        </h2>
    );
}

export default ContentHeading;
