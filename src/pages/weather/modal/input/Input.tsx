import { Dispatch } from 'react';
import './input.scss';
import { MdLocationSearching } from "react-icons/md";

type InputProps = {
    setState:Dispatch<string>,
}

function Input({setState}: InputProps) {
    return (
        <div className='weather-page__input'>
            <MdLocationSearching fill='#757575' size={32} />
            <input type='text' placeholder='Pesquisar' id='citiesinput' name='citiesinput' onChange={(e) => setState(e.target.value)} />
        </div>
    )
}

export default Input