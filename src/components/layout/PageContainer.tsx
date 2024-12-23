import React from 'react';

interface IPageContainerProps {
    children: React.ReactNode;
}

function PageContainer({ children }: IPageContainerProps) {
    return (
        <div className={'container mx-auto space-y-6 px-4 py-5'}>
            {children}
        </div>
    );
}

export default PageContainer;
