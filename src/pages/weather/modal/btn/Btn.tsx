import { Dispatch } from 'react';
import './btn.scss';

type BtnProps = {
    text:string,
    setState:Dispatch<string>,
    icon:string,
    value:string,
    setModal:Dispatch<boolean>,
}

function Btn({text, setState , value, icon, setModal}: BtnProps) {

    const handleChange = () => {
        setState(value);
        setModal(false);
    }

    return (
        <button className='weather-page_city_btn' onClick={handleChange}>
            <img src={icon} alt={`${text} ícone`} />
            <p>{text}</p>
        </button>
    )
}

export default Btn