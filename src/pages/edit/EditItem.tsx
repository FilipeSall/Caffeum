import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { EditLinkProps } from "../../Global/Types";
import { DocumentSnapshot, doc, getDoc, updateDoc, } from "firebase/firestore";
import { db, storage } from "../../config/Firebase";
import Loading from "../../components/loading/Loading";
import './EditItem.scss';
import fileIcon from '../../assets/icons/edit.svg';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer } from "react-toastify";
import { toastMessage } from "../../Global/toatsMessage";
import Error from "../error/Error";
import { depenciesTypesOptions, toolsTypesOptions } from "../../Global/typesOptions";

function EditItem() {
    const { id } = useParams();
    const [linkInfo, setLinkInfo] = useState<EditLinkProps>();
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState<string>('');
    const [bigType, setBigType] = useState('');
    const [file, setFile] = useState<File | null>();
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [description, setDescription] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [path, setPath] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const selectedFile = fileInput.files && fileInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setIsFileLoaded(true);
        } else {
            toastMessage('error', 'formato nao permitido');
        }
    }

    useEffect(() => {
        const getSelectedLink = async () => {
            setLoading(true);
            try {
                const docRef1 = doc(db, `ferramentas/${id}`);
                const docRef2 = doc(db, `frameworks/${id}`);
                const docSnapshot1 = await getDoc(docRef1);
                const docSnapshot2 = await getDoc(docRef2);
                const selectedSnapshot =
                    docSnapshot1.exists() ?
                        docSnapshot1 :
                        (docSnapshot2.exists() ? docSnapshot2 : setBigType('error'));

                if (selectedSnapshot) {
                    const data = docSnapshot1.exists() ? docSnapshot1.data() : docSnapshot2.data();
                    const linkInfoData: EditLinkProps = {
                        title: data?.title || '',
                        icon: data?.icon || '',
                        description: data?.description || '',
                        types: data?.types || [],
                        path: data?.path || '',
                        id: docSnapshot1.exists() ? docSnapshot1.id : docSnapshot2.id,
                        bigType: selectedSnapshot === docSnapshot1 ? 'ferramentas' : 'frameworks',
                    };
                    setLinkInfo(linkInfoData);
                }
            } catch (error) {
                console.error(`Erro ao buscar pelo banco de dados: ${error}`);
                toastMessage('error', `${error}`);
            } finally {
                setLoading(false);
            }
        }
        getSelectedLink();
    }, [id]);

    useEffect(() => {
        const seAllStats = () => {
            if (linkInfo) {
                setTitle(linkInfo.title);
                setIcon(linkInfo.icon);
                setPath(linkInfo.path);
                setDescription(linkInfo.description);
                setTypes(linkInfo.types);
                setBigType(linkInfo.bigType);
            }
        }
        seAllStats();
    }, [linkInfo])

    const handleReset = () => {
        if (linkInfo) {
            setTitle(linkInfo.title);
            setIcon(linkInfo.icon);
            setPath(linkInfo.path);
            setDescription(linkInfo.description);
            setTypes(linkInfo.types);
            setBigType(linkInfo.bigType);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!linkInfo) {
            console.error(`Nao foi possível fazer o submit! Problemas em se conectar com o documento no firestore.`);
            setLoading(false);
        }

        const docRef = doc(db, `${linkInfo?.bigType}/${id}`); 

        try {

            if (file) {
                const docSnapshot: DocumentSnapshot = await getDoc(docRef);
                const oldImgUrl: string | undefined = docSnapshot.data()?.icon;
                if (oldImgUrl) {
                    await deleteObject(ref(storage, oldImgUrl));
                }

                const storagePath = ref(storage, `icons/${title}`);
                await uploadBytes(storagePath, file);
            
                const newImgUrl = await getDownloadURL(storagePath);
                if (newImgUrl) {   
                    await updateDoc(docRef, ({ icon: newImgUrl }));
                    toastMessage('success', 'Sucesso em trocar a nova imagem no storage.');
                }else{
                    console.log('newImgUrl esta undefined');
                }
            }
            const islinkInfoNotUndefined = typeof linkInfo !== 'undefined';
            if (islinkInfoNotUndefined && title !== linkInfo.title) {
                updateDoc(docRef, ({ title: title }));
                toastMessage('success', `Novo ${title} atualizado com sucesso.`);
            }
            if (description !== linkInfo?.description) {
                updateDoc(docRef, ({ description: description }));
                toastMessage('success', 'Nova descrição atualizada com sucesso.');
            }
            if (types[0] !== linkInfo?.types[0]) {
                updateDoc(docRef, ({ types: types }));
                toastMessage('success', `Alterado para o tipo ${types[0]} com sucesso.`)
            }
            if(path !== linkInfo?.path){
                updateDoc(docRef, ({path:path}));
                toastMessage('success', `Alterado para o tipo ${path} com sucesso.`)
            }
        }
        catch (error) {
            console.log(error);
            const errorStringed = String(error);
            toastMessage('error', errorStringed);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="edit-item__container">
            {bigType === 'error' || undefined ? <Error /> : loading ? <Loading /> :
                <form className="edit-item__form" onSubmit={handleSubmit}>
                    <div className='edit-item__input__wrapper'>
                        <label htmlFor="edit-item__file__img">Icone do site</label>
                        <input type="file" style={{ display: 'none' }} id="edit-item__file__img" onChange={handleFileUpload} />
                        {/* botao file que direciona para o input FILE*/}
                        <button type='button' className="edit-item__fileBtn" onClick={() => document.getElementById('edit-item__file__img')?.click()}>{isFileLoaded ? file && <img src={URL.createObjectURL(file)} alt="Imagem selecionada" /> : <img src={icon ? icon : fileIcon} />}{file &&
                            <div className="editForm-newFile_type__wrapper">
                                <p><span>Formato da nova imagem:</span>{file.type}</p>
                                <p><span>Tamanho da nova imagem:</span>{file.size}</p>
                            </div>}
                        </button>
                        {/*Input para alterar o titulo */}
                    </div>
                    <div className='edit-item__input__wrapper'>
                        <label htmlFor="edit-item__title">Titulo do site</label>
                        <input type="text" id='edit-item__title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    {/*Input para alterar o path */}
                    <div className="edit-item__input__wrapper">
                        <label>Path atual</label>
                        <input type="url" value={path} onChange={(e) => setPath(e.target.value)} />
                    </div>
                    {/*Input para alterar a descrição */}
                    <div className="edit-item__input__wrapper">
                        <label>Descrição</label>
                        <textarea maxLength={166} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    {/*Input para alterar o bigtype */}
                    <div className="edit-item__input__wrapper">
                        <label>Banco de dados</label>
                        <select value={bigType} onChange={(e) => setBigType(e.target.value)}>
                            <option value={''} disabled>Selecione uma opção</option>
                            <option value={'ferramentas'}>Ferramentas</option>
                            <option value={'frameworks'}>Dependências</option>
                        </select>
                    </div>
                    {/*Input para alterar os types */}
                    <div className="edit-item__input__wrapper">
                        <label>Função</label>
                        <select id="edit-item__select__type" value={types[0]} onChange={(e) => setTypes([e.target.value])}>
                            {bigType === 'ferramentas' &&
                                <>
                                    <option value={''} disabled>Selecione uma opção</option>
                                    {toolsTypesOptions.map((option, i) => (
                                        <option key={i} value={option.value}>{option.text}</option>
                                    ))}
                                </>}
                            {
                                bigType === 'frameworks' &&
                                <>
                                    <option value={''} disabled>Selecione uma opção</option>
                                    {depenciesTypesOptions.map((option, i) => (
                                        <option key={i} value={option.value}>{option.text}</option>
                                    ))}
                                </>
                            }
                        </select>
                    </div>
                    <div className="edit-form__btnWrapper">
                        <button>Alterar</button>
                        <button type="reset" onClick={handleReset}>Reset</button>
                        <NavLink to={'/admin/edit/'}>Voltar</NavLink>
                    </div>
                </form>
            }
            <ToastContainer />
        </div >
    )
}

export default EditItem