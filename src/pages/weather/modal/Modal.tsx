import { Dispatch, useRef, useState } from 'react';
import './modal.scss';
import citiesList from './citiesList';
import Btn from './btn/Btn';
import Input from './input/Input';
import normalizeString from '../../../scripts/normalizeString';
import useOutsideClick from '../../../hooks/useClickOutside';

type CityProps = {
    setState: Dispatch<string>;
    setModal: Dispatch<boolean>,
    btnRef?: any
}

function Modal({ setState, setModal, btnRef }: CityProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    const citiesFiltered = citiesList.filter(city =>
        normalizeString(city.text).includes(normalizeString(searchTerm))
    );

    useOutsideClick({ modalRef, setModal, parentRef: btnRef });

    return (
        <div className="weather-page_modal" ref={modalRef}>
            <Input setState={setSearchTerm} />
            {citiesFiltered.length === 0 ? (
                <p className='weather-page_nocityfounded_text'>Não temos esta cidade em nossa lista.</p>
            ) : (
                citiesFiltered.map((city, i) => (
                    <Btn
                        icon={city.icon}
                        text={city.text}
                        setState={setState}
                        key={i}
                        value={city.value}
                        setModal={setModal}
                    />
                ))
            )}
        </div>
    )
}

export default Modal