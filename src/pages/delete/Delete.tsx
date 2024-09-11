import { useEffect, useState } from 'react';
import './delete.scss';
import { EditLinkProps } from '../../Global/Types';
import { getLinksId } from '../../services/LinkToolsAcess';
import Loading from '../../components/loading/Loading';
import { DocumentData } from 'firebase/firestore';
import Modal from './modal/Modal';

function Delete() {

    const [links, setLinks] = useState<EditLinkProps[] | DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState(false);
    const [clickedBtn , setClickedBtn] = useState<EditLinkProps | null>(null);
    const [bigType, setBigType] = useState('ferramentas');

    useEffect(() => {
        const dataFecth = async () => {
            setLoading(true);
            try {
                const datas = await getLinksId(bigType);

                if (datas) {
                    const linksList: EditLinkProps[] = [];
                    datas.forEach(link => {
                        linksList.push({
                            title: link.data().title,
                            icon: link.data().icon,
                            description: link.data().description,
                            types: link.data().types,
                            path: link.data().path,
                            id: link.id,
                            bigType: ''
                        });
                    });

                    setLinks(linksList);
                }
            }
            catch (error) {
                console.log(`Nao foi possivel acessar o banco de dados: ${error}`)
            }
            finally {
                setLoading(false);
            }
        }
        dataFecth();
    }, [bigType])

    const handleLinkClick = (link: any) => {
        setModal(true);
        setClickedBtn(link)
    }

    return (
        <main className='delete-container'>
            <header className='delete-container__header'>
                <h1>Selecione o Banco de dados:</h1>
                <select value={bigType} onChange={(e)=> setBigType(e.target.value)}>
                    <option value='ferramentas'>Ferramentas</option>
                    <option value='frameworks'>Frameworks</option>
                    <option value='study_links'>Estudos</option>
                </select>
            </header>
            <div className={`delete-links_wrapper ${modal && 'background-offFocus'}`}>
                {!loading ? links.map((link, i) => (
                    <button onClick={() => handleLinkClick(link)} className='delete-btn_link' key={i}>
                        <img src={link.icon} />
                        {link.title}
                    </button>
                )) : <Loading />}
            </div>
            {modal && clickedBtn && <Modal setModal={setModal} bigType={bigType} icon={clickedBtn.icon} title={clickedBtn.title} id={clickedBtn.id} />}
        </main>
    )
}

export default Delete