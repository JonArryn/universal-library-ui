import { useCallback, useEffect, useState } from 'react';
import ContentHeading from '../../../components/typography/ContentHeading.tsx';
import StyledButton from '../../../components/StyledButton.tsx';
import LibraryCard from './components/LibraryCard.tsx';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../api/apiService.ts';
import PageContainer from '../../../components/layout/PageContainer.tsx';
import { ILibrary } from '../../types/entityTypes.ts';

function MyLibrariesPage() {
    const [libraries, setLibraries] = useState<[] | ILibrary[]>([]);

    const navigate = useNavigate();

    const getLibraries = useCallback(async function () {
        const response = await apiService.get('/library');
        setLibraries(response.data.data);
    }, []);

    useEffect(() => {
        getLibraries();
    }, [getLibraries]);

    return (
        <PageContainer>
            <div className={'flex justify-between'}>
                <ContentHeading text={'My Libraries'} />
                <StyledButton
                    text={'+ New Library'}
                    style={'new'}
                    handleClick={() => navigate('/app/library/create')}
                />
            </div>
            <div className={'columns-3'}>
                {libraries.length > 0 &&
                    libraries.map((library) => (
                        <LibraryCard library={library} key={library.id} />
                    ))}
            </div>
        </PageContainer>
    );
}

export default MyLibrariesPage;
