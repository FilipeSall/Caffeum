import { ModalProps } from '../../Global/Types';
import './Modal.scss';
import { depenciesTypesOptions, toolsTypesOptions } from '../../Global/typesOptions';
import allicon from '../../assets/icons/all.svg';
import closeIcon from '../../assets/icons/close.svg';
import { useEffect, useRef } from 'react';

function Modal({ bigType, setModal, modal, filterType, setFilterType, parentRef }: ModalProps) {

    const arrayToFilter = bigType === 'ferramentas' ? toolsTypesOptions : depenciesTypesOptions;
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!modalRef || !modalRef.current || !parentRef || !parentRef.current) return;
            const targetNode = e.target as Node;
            if (!modalRef.current.contains(targetNode) && !parentRef.current.contains(targetNode)) {
                setModal(false);
            }
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [setModal, parentRef])

    return (
        <section className={`modal-container ${modal ? 'modalActive' : 'modalInactve'}`} ref={modalRef}>
            <button className='closeBtn' onClick={() => setModal(false)} >
                <img src={closeIcon} />
            </button>
            <button
                type='button'
                className={`${filterType[0] === '' && 'modalBtnACtive'} modal-dropdown__item`}
                onClick={() => {setFilterType(['']); setModal(false)}}
            >
                <img src={allicon} alt={'Todos'} />
                <p>Todos</p>
            </button>
            {arrayToFilter.map((item, i) => (
                <button
                    key={i}
                    className={`${item.value === filterType[0] && 'modalBtnACtive'} modal-dropdown__item`}
                    type='button'
                    onClick={() => {setFilterType([item.value]);setModal(false);}}
                >
                    <img src={item.icon} alt={item.title}  />
                    <p>{item.text}</p>
                </button>
            ))}
        </section>
    );
}

export default Modal;