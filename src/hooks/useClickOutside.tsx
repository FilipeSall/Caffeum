import { useEffect } from 'react';
import { UseOutsideClickProps } from '../Global/Types';

const useOutsideClick = ({ modalRef, setModal, parentRef }: UseOutsideClickProps) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!modalRef.current) return;
            const targetNode = e.target as Node;
            if (
                !modalRef.current.contains(targetNode) &&
                (!parentRef?.current || !parentRef.current.contains(targetNode))
            ) {
                setModal(false);
            }
        };

        // Adiciona o evento de clique
        document.addEventListener('mousedown', handler);

        // Remove o evento quando o componente for desmontado
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [modalRef, parentRef, setModal]);
};

export default useOutsideClick;