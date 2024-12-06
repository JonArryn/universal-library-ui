import ContentHeading from '../components/typography/ContentHeading.tsx';
import TextContent from '../components/typography/TextContent.tsx';

function AboutPage() {
    return (
        <div className={'container mx-auto px-4'}>
            <ContentHeading text={'Learn About The App'} />
            <TextContent text={'This is the content for the About page'} />
        </div>
    );
}

export default AboutPage;
