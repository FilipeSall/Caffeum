import './Home.scss';
import { LinksToolsProps } from '../../Global/Types';
import React, { useEffect, useRef, useState } from 'react';
import { getLinks } from '../../services/LinkToolsAcess';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import toolsicon from '../../assets/icons/tools.svg';
import dependenciesicon from '../../assets/icons/dependencies.svg';
import loadingIcon from '../../assets/icons/loading.svg';
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import arrowUpModal from '../../assets/icons/ArrowUpModal.svg';
import Seo from '../../components/seo/Seo';
import filterError from '../../scripts/filterError';

function Home() {

    const [links, setLinks] = useState<LinksToolsProps[] | DocumentData[]>([]);
    const [selectedDb, setSelectedDb] = useState('ferramentas');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastLink, setLastLink] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [isModal, setIsModal] = useState(false);
    const [filterType, setFilterType] = useState<string[]>(['']);
    const [error, setError] = useState('');

    const observerTarget = useRef<HTMLDivElement | null>(null); (null);
    const PAGE_LIMIT = 8;
    const parentImgNodeRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchLinks = async () => {
            try {
                const { linksToolsDocs, lastVisible } = await getLinks(selectedDb, PAGE_LIMIT);
                setLinks(linksToolsDocs);
                setLastLink(lastVisible);
            } catch (error) {
                console.log(error);
                setError(filterError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [selectedDb]);

    //Observer para quando chegar no final da pagina, carregar mais 6 itens
    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            const ratio = entries[0].intersectionRatio;

            if (ratio > 0 && lastLink) {
                try {
                    const { linksToolsDocs, lastVisible } = await getLinks(selectedDb, PAGE_LIMIT, lastLink);
                    setLinks((prevLinks) => [...prevLinks, ...linksToolsDocs]);
                    setLastLink(lastVisible);
                } catch (error) {
                    console.log(error);
                }
            }
        });

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [selectedDb, lastLink, links]);

    const getIcons = (value: string) => {
        if (value === 'ferramentas' && !loading) {
            return toolsicon;
        }
        if (value === 'frameworks' && !loading) {
            return dependenciesicon;
        }
        if (loading) {
            return loadingIcon;
        }
    };

    const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterModal = () => {
        setIsModal(!isModal);
    }

    const handleCloseModal = () => {
        setIsModal(false);
    }

    const filteredLinks = links
        .filter(link => link.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(link => link.types[0].includes(filterType[0]));

    return (
        <>
            <>
                <Seo
                    title='Caffeum | Links Hub'
                    description='Que tal tomar um café enquanto estuda as tecnologias que você usa no trabalho?'
                />
            </>
            <section className={`home-container`}>
                <header className={`header-home`}>
                    <div>
                        <input type="text" placeholder='Pesquisar' value={searchTerm}
                            onChange={handleFilter} />
                        <img ref={parentImgNodeRef} className={`header-home_icon ${loading && 'header-home_icon__loading'}`} alt={selectedDb} src={getIcons(selectedDb)} onClick={!isModal ? handleFilterModal : handleCloseModal} />
                        <select value={selectedDb} onClick={() => { setIsModal(false); setFilterType(['']) }} onChange={(e) => { setSelectedDb(e.target.value); setLastLink(null) }}>
                            <option value={'ferramentas'}>Ferramentas</option>
                            <option value={'frameworks'}>Frameworks</option>
                        </select>
                    </div>
                    {isModal && <>
                        <img src={arrowUpModal} className='arrowUpModalIcon' />
                        <Modal
                            bigType={selectedDb}
                            setModal={setIsModal}
                            filterType={filterType}
                            setFilterType={setFilterType}
                            modal={isModal}
                            parentRef={parentImgNodeRef}
                        />
                    </>}
                </header>
                <main className={`home-content__container`}>
                    {!loading && (
                        filteredLinks.length > 0 ? (
                            filteredLinks.map((link, i) => (
                                <Card
                                    key={i}
                                    description={link.description}
                                    icon={link.icon}
                                    path={link.path}
                                    title={link.title}
                                    types={link.types}
                                />
                            ))
                        ) : (
                            error ? (
                                <p className="no-results-message">{error}</p>
                            ) : (
                                <div className="no-results-message">Nenhum resultado encontrado</div>
                            )
                        )
                    )}
                    <div ref={observerTarget} className={'observerTarget'} />
                </main>
            </section>
        </>
    );
}

export default Home;