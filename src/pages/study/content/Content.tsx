import { useEffect, useState } from 'react';
import './content.scss';
import { StudyLinkProps } from '../../../Global/Types';
import { getLinks } from '../../../services/LinkToolsAcess';
import { DocumentData } from 'firebase/firestore';
import Loading from '../../../components/loading/Loading';


function Content({searchTerm} :{searchTerm:string}) {

    const [studyLinks, setStudyLinks] = useState<StudyLinkProps[] | DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchLinks = async () => {
            try {
                const { linksToolsDocs } = await getLinks('study_links', -1);
                setStudyLinks(linksToolsDocs);

            } catch (err) {
                console.log(`Erro ao buscar o banco de dados. ${err}`);
            }
            finally {
                setLoading(false);
            }
        }
        fetchLinks();
    }, []);

    // Get unique types
    const uniqueTypes = Array.from(new Set(studyLinks.map(link => link.type)));

    // Filter links by type
    const getLinksByType = (type: string) => studyLinks.filter(link => link.type === type).filter(link => link.title.toLowerCase().includes(searchTerm.toLowerCase())) ;

    return (
        <main className='study-content'>
            {loading && <Loading />}
            {!loading && (
                <>
                    {uniqueTypes.length > 0 ? (
                        uniqueTypes.map(type => {
                            const linksByType = getLinksByType(type);
                            return (
                                <div key={type} className='study-links_wrapper'>
                                    <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                                    <div className='study-links__wrapper_thumbnail'>
                                        {linksByType.length > 0 ? (
                                            linksByType.map(link => (
                                                <a href={link.path} target="_blank" rel="noopener noreferrer" key={link.title} className={`study-link_item ${link.title.length > 25 ? 'study-link-item_longlength' : 'study-link-item_normallength'}`}>
                                                    <img src={link.icon} alt={link.title} className='study-link_item__icon' />
                                                    <h3>{link.title}</h3>
                                                </a>
                                            ))
                                        ) : (
                                            <p className='study-nolinks_text'>Sem links para essa categoria.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className='study-nolinks_text'>Nenhum Link encontrado.</p>
                    )}
                </>
            )}
        </main>
    );
};

export default Content