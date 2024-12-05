import ContentHeading from '../components/typography/ContentHeading.tsx';
import TextContent from '../components/typography/TextContent.tsx';

function HomePage() {
    return (
        <div className={'container mx-auto px-4'}>
            <ContentHeading text={'Welcome to the App'} />
            <TextContent text={'This is the content for the home page'} />
        </div>
    );
}

export default HomePage;
