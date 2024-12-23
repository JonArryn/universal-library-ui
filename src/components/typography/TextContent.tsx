interface ITextContentProps {
    text: string | number;
}

function TextContent({ text }: ITextContentProps) {
    return <p className={'text-gray-900 dark:text-slate-100'}>{text}</p>;
}

export default TextContent;
