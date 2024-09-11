import { Dispatch } from 'react';
import './header.scss';

type HeaderProps = {
    searchTerm:string,
    setSearchTerm: Dispatch<string>,
}

function Header({searchTerm, setSearchTerm}:HeaderProps) {
    return (
        <header className='study-header'>
            <input 
            type='text' 
            id='study-header_input' 
            className='study-header_input' 
            placeholder='Procurar matérias' 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            />
        </header>
    )
}

export default Header