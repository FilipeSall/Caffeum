import { Dispatch } from 'react';
import './Modal.scss';
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../config/Firebase';

type ModalDeleteLinkProps = {
    id: string | undefined,
    setModal: Dispatch<boolean>,
    title: string,
    icon: string,
    bigType:string,
}

function Modal({ id, title, setModal, icon, bigType }: ModalDeleteLinkProps) {

    const handleDeleteLink = async (id: string | undefined) => {
        if (id) {
            try {
                // Referência do documento
                const docRef = doc(db, `${bigType}/${id}`);

                // Obter o documento
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    // URL da imagem (path relativo)
                    const imgPath: string | undefined = docSnapshot.data()?.icon;

                    if (imgPath) {
                        // Referência da imagem no Storage
                        const imgRef = ref(storage, imgPath);

                        // Deletar a imagem
                        await deleteObject(imgRef);
                    }

                    // Deletar o documento do Firestore
                    await deleteDoc(docRef);
                } else {
                    console.error('Documento não encontrado');
                }
            } catch (error) {
                console.error('Erro ao deletar o documento ou imagem:', error);
            } finally {
                setModal(false);
            }
        }
    };

    return (
        <div className='modal-delete_wrapper'>
            <div className='modal-delete_text__wrapper'>
                <p>Certeza que quer deletar o link <span>{title}</span>?</p>
                <img src={icon} />
            </div>
            <div className='modal-delete_btn__wrapper'>
                <button onClick={() => handleDeleteLink(id)}>
                    Sim, deletar <GiConfirmed size={34} fill='#3DDC97' aria-label='Deletar' />
                </button>
                <button onClick={() => setModal(false)}>
                    Não, cancelar <MdCancel size={36} fill='#FF495C' aria-label='Cancelar'  />
                </button>
            </div>
        </div>
    )
}

export default Modal