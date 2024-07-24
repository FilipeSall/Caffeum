import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import './Create.scss';
import InputWrapper from '../../components/inputWrapper/InputWrapper';
import { db, storage } from '../../config/Firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from '../../components/loading/Loading';
import { addDoc, collection } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import clickIcon from '../../assets/icons/click.svg';
import backarrow from '../../assets/icons/backarrow.svg'
import { depenciesTypesOptions, toolsTypesOptions } from '../../Global/typesOptions';

type ValueState = string | File;

interface CustomInput {
    id: string;
    type: string;
    value: ValueState;
    setValue: Dispatch<SetStateAction<ValueState>>;
    setError?: Dispatch<string>;
    labelText: string;
    isLoaded?: boolean;
    setIsLoaded?: Dispatch<boolean>;
}

function Create() {
    const [title, setTitle] = useState('');
    const [bigType, setBigType] = useState('');
    const [isFileUploaded, setIsFileIploaded] = useState(false);
    const [file, setFile] = useState<File | null | undefined>(null);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [types, setTypes] = useState<string[] | string>('');
    const [loading, setLoading] = useState(false);
    const [isSucess, setIsSucess] = useState(false);

    const inputs: CustomInput[] = [
        {
            id: 'title',
            type: 'text',
            value: title,
            setValue: setTitle as Dispatch<SetStateAction<ValueState>>,
            labelText: 'Qual o nome do Link?',
        },
        {
            id: 'path',
            type: 'url',
            value: link,
            setValue: setLink as Dispatch<SetStateAction<ValueState>>,
            labelText: 'Qual o path do link?',
        },
        {
            id: 'file',
            type: 'file',
            labelText: 'Selecione um arquivo de imagem para o link',
            value: file as File,
            setValue: setFile as Dispatch<SetStateAction<ValueState>>,
            isLoaded: isFileUploaded,
            setIsLoaded: setIsFileIploaded,
        }
    ]

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setTypes(selectedOptions);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!title || !types || !file || !description || !link) {
            setError('Campos não podem ficar vazios!');
            setLoading(false);
            return
        }
        if(description.length > 166){
            setError('Ultrapassou 166 caracteres');
            setLoading(false);
            return
        }

        const linkName = title + link;
        const storageRef = ref(storage, `icons/${title}`);
        try {
            await uploadBytes(storageRef, file);
            const imgUrl = await getDownloadURL(storageRef);
            console.log(`${imgUrl} gerado`)
            if (imgUrl) {
                const newLink = ({
                    description: description,
                    icon: imgUrl,
                    path: link,
                    title: title,
                    types: Array.isArray(types) ? types : [types],
                })
                await addDoc(collection(db, bigType), newLink);
                console.log(`${title} criado com sucesso!`);
                setIsSucess(true);
            } else {
                setError('Erro ao fazer o upload da imagem');
                await deleteObject(storageRef);
                console.log(`${storageRef.name} deletado do storage`);
            }
        }
        catch (error) {
            console.log(`Error ao criar o Link: ${error}`)
            if (typeof error === 'string') {
                setError(error);
            }
            if (storageRef) {
                await deleteObject(storageRef);
                console.log(`${linkName} deletado do storage após o erro.`)
            }
            setLoading(false);
            setIsSucess(false);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className='admin-create__container'>
            {loading && <Loading />}
            <form className='admin-create__form' onSubmit={handleSubmit} style={{ display: loading || isSucess ? 'none' : 'flex' }}>
                {inputs.map((input, i) => (
                    <InputWrapper
                        key={i}
                        id={input.id}
                        setValue={input.setValue}
                        value={input.value}
                        inputType={input.type}
                        labelText={input.labelText}
                        setError={setError}
                        setIsLoaded={input.setIsLoaded}
                        isLoaded={input.isLoaded}
                    />
                ))}
                {/*BIG TYPE */}
                <div className='admin-creater__input-wrapper'>
                    <label htmlFor='new-big-type'>O que ele é?</label>
                    <select id='new-big-type' value={bigType} onChange={(e) => setBigType(e.target.value)}>
                        <option value={''} disabled>Selecione uma opção</option>
                        <option value={'ferramentas'}>Ferramenta</option>
                        <option value={'frameworks'}>Dependencia framework</option>
                    </select>
                </div>
                {/*TYPE */}
                <div className='admin-creater__input-wrapper'>
                    <fieldset className='admin-creater__fieldset'>
                        <legend>Qual a principal função do link?</legend>
                        {bigType === 'ferramentas' &&
                            <select value={types} onChange={handleSelectChange}>
                                <option value={''} disabled>Selecione uma opção</option>
                                {toolsTypesOptions.map((option, i)=> (
                                    <option key={i} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        }
                        {bigType === 'frameworks' &&
                            <select value={types} onChange={handleSelectChange}>
                                <option value={''} disabled>Selecione uma opção</option>
                                {depenciesTypesOptions.map((option, i)=> (
                                    <option key={i} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        }
                    </fieldset>
                </div>
                {/*DESCRIPTION */}
                <div className='admin-creater__input-wrapper'>
                    <label htmlFor='new-description'>Qual a descrição do link?</label>
                    <textarea id='new-description' value={description} onChange={(e) => setDescription(e.target.value)} maxLength={166} />
                    <p className={description.length === 166 ? 'new-description__count__max' : 'new-description__count'}>{description.length} / 166</p>
                </div>
                {error && <p className='form-error__message'>{error}</p>}
                <div className='addLink-btn__wrapper'>
                    <button className='addLink-submitBtn'>Criar</button>
                    <NavLink to={'/admin'}><img src={backarrow} className='back-arrow__icon' alt='Voltar' /><span>Voltar</span></NavLink>
                </div>
            </form>
            {/*Caso seja criado com sucesso, mostrar esse painel */}
            {isSucess &&
                <div className='form__sucess__container' style={{ display: isSucess ? 'flex' : 'none' }}>
                    <NavLink to={'/'}>{title} Criado com sucesso! <img src={clickIcon} alt='criado com sucesso' /></NavLink>
                    <div className='sucess-info__wrapper '>
                        <a href={link}>Link para o site:{link}</a>
                        <p>Formato da imagem: {file?.type}</p>
                        <p>Tamanho da imagem: {file?.size}</p>
                    </div>
                </div>
            }
        </main>
    )
}

export default Create