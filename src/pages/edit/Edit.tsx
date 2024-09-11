import { useEffect, useState } from 'react';
import './Edit.scss';
import { getLinksId } from '../../services/LinkToolsAcess';
import { EditLinkProps } from '../../Global/Types';
import ferramentasIcon from '../../assets/icons/tools.svg';
import frameworksIcon from '../../assets/icons/dependencies.svg';
import loadingIcon from '../../assets/icons/loading.svg';
import { NavLink } from 'react-router-dom';

function Edit() {

    const [bigType, setBigType] = useState('ferramentas');
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState<EditLinkProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    const getIconsBtTpye = (value: string) => {
        if (value === 'ferramentas' && !loading) {
            return ferramentasIcon
        }
        if (value === 'frameworks' && !loading) {
            return frameworksIcon
        }
        if (loading) {
            return loadingIcon
        }
    }

    const searchedTerm = links.filter(link => link.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className='edit-container'>
                <div className='edit-select__wrapper'>
                    <img className={loading ? 'loadingIcon' : ''} src={getIconsBtTpye(bigType)} alt={bigType} />
                    <div className='edit-select__textWrapper'>
                        <p> Banco de dados ativo:</p>
                        <select value={bigType} onChange={(e) => setBigType(e.target.value)}>
                            <option value='ferramentas'>Ferramentas</option>
                            <option value='frameworks'>Dependencias</option>
                        </select>
                    </div>
                </div>

                <input className='edit-content_input' type='text' placeholder='Pesquise pelo nome' id='edit-content_input' onChange={(e) => setSearchTerm(e.target.value)} />

                <div className='edit-content__container'>
                    {!loading &&
                        <div className='edit-links__wrapper'>
                            {searchedTerm.length > 0 ? links && searchedTerm.map((link, i) => (
                                <NavLink key={i} to={`/admin/${link.id}`} className={`edit-link__button`}>
                                    <img src={link.icon} alt={link.title} />
                                    <p className={`${link.title.length > 10 ? 'edit-link__button_txtLarge' : 'edit-link__button_txtNormal'}`}>{link.title}</p>
                                </NavLink>
                            )) : <p className='edit-links_nolinktext'>Nenhum link com esse nome.</p>}
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Edit