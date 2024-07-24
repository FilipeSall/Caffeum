import { useEffect, useState } from 'react';
import './Study.scss';
import { Avatar, Card, Flex, Text } from '@radix-ui/themes';
import { MapaMentalProps, jobSitesProps } from '../../Global/Types';
import { getLinks } from '../../services/LinkToolsAcess';
import Loading from '../../components/loading/Loading';
import { jobSites } from './jobSites';
import { Link } from 'react-router-dom';
import { ordenarPorValor } from '../../Global/scripts';
import jsicon from '../../assets/icons/javascript.svg';
import cssIcon from '../../assets/icons/css.svg';
import jobIcon from '../../assets/icons/job.svg';
import jobprofileicon from '../../assets/icons/jobprofile.svg';
import htmlicon from '../../assets/icons/html.svg';
import { programingSites } from './programingSites';
import studyProgramingIcon from '../../assets/icons/programingstudy.svg';

function Study() {

    const [mapasMentais, setMapasMentais] = useState<MapaMentalProps[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchLinks = async () => {
            try {
                const { linksToolsDocs } = await getLinks('mapas_mentais', 6);
                const newMapasMentais = linksToolsDocs.map(link => ({
                    description: link.description,
                    title: link.title,
                    url: link.url,
                    type: link.type
                }));

                setMapasMentais(newMapasMentais);
            }
            catch (error) {
                console.log(`Erro ao pegar o banco de dados: ${error}`);
            }
            finally {
                setLoading(false);
            }
        }

        fetchLinks();
    }, [])

    const jobsitesSorted = ordenarPorValor(jobSites, 'title');

    const techIcon = (value: string) => {
        if (value === 'css') {
            return cssIcon
        } else if (value === 'js') {
            return jsicon
        } else if (value === 'jobfinder') {
            return jobIcon
        } else if (value === 'jobprofile') {
            return jobprofileicon
        } else if (value === 'html') {
            return htmlicon
        }
    }

    return (
        <Flex className={`study-container`} direction={'column'} >
            {!loading ?
                <Flex className={`study-container__fieldSetWrapper`}>
                    <fieldset className='study-legend'>
                        <legend>Mapas mentais</legend>
                        {mapasMentais && mapasMentais.map((map, i) => (
                            <a href={map.url} key={i} target='__blank' className='study_link-btn'>
                                <Card variant='classic'>
                                    <Flex align={'center'} gap={'2'}>
                                        <Avatar size={'4'} fallback='img' src={map.type ? techIcon(map.type) : map.url} />
                                        <Flex direction={'column'} justify={'center'} >
                                            <Text size={'5'} weight={'bold'}>{map.title}</Text>
                                            <Text>{map.description}</Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </a>
                        ))}
                    </fieldset>

                    <fieldset className='study-legend'>
                        <legend>Sites para emprego</legend>
                        {jobsitesSorted.map((site: jobSitesProps, i: number) => (
                            <Link key={i} to={site.url} target='_blank'>
                                <Card className='study_link-btn'>
                                    <Flex align={'center'} gap={'2'}>
                                        <Avatar fallback='img' size='4' src={site.type && techIcon(site.type)} />
                                        <Flex direction={'column'} justify={'center'}>
                                            <Text size={'5'} weight={'bold'}>
                                                {site.title}
                                            </Text>
                                            <Text>{site.type === 'jobfinder' ? 'Site para busca de empregos' : 'Perfil de redes sociais que alerta sobre vagas'}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Link>
                        ))}
                    </fieldset>
                    <fieldset className='study-legend'>
                        <legend>Sites para estudar programação</legend>
                        {programingSites.map((site: jobSitesProps, i: number) => (
                            <Link key={i} to={site.url} target='_blank'>
                                <Card className='study_link-btn'>
                                    <Flex align={'center'} gap={'2'}>
                                        <Avatar fallback='img' size='4' src={studyProgramingIcon} />
                                        <Flex direction={'column'} justify={'center'}>
                                            <Text size={'5'} weight={'bold'}>
                                                {site.title}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Link>
                        ))}
                    </fieldset>
                </Flex> : <Loading />}

        </Flex>
    )
}

export default Study