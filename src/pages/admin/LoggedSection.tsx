import './Admin.scss';
import { auth } from '../../config/Firebase';
import { NavLink } from 'react-router-dom';
import createIcon from '../../assets/icons/create.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

function LoggedSection() {

    const handleSingOut = async() => {
            localStorage.removeItem('users');
            auth.signOut();

    }

    return (
        <main className={`logged-section__container`}>
            <NavLink to={'/admin/create'} className={'logged-section__navlink'}> <img className='logged-secction_nav__img' alt='criar' src={createIcon} />Criar Link</NavLink>
            <NavLink to={'/admin/edit'} className={'logged-section__navlink'}> <img className='logged-secction_nav__img' alt='editar' src={editIcon} />Editar Link</NavLink>
            <NavLink to={'/admin/delete'} className={'logged-section__navlink'}> <img className='logged-secction_nav__img' alt='editar' src={deleteIcon} />Deletar Link</NavLink>
            <button onClick={handleSingOut}  className={'logged-section__navlink'}> <img className='logged-secction_nav__img' alt='log out' src={logoutIcon}/> Log out</button>    
        </main>
    )
}

export default LoggedSection