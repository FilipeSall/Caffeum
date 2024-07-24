import { FormEvent, useEffect, useState } from 'react';
import './Admin.scss';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase';
import { signIn } from '../../services/AuthAcess';
import { FirebaseError } from 'firebase/app';
import LoggedSection from './LoggedSection';
import { getUserData } from '../../services/UserAcess';

function Admin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const storedUser = localStorage.getItem('user');
    const initialUserState = storedUser ? JSON.parse(storedUser) : null;
    const [user, setUser] = useState<User | null>(initialUserState);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        
        const unsbscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        })

        return () => {
            unsbscribe();
        };
    }, [user])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn(email, password);
            if (result) {
                setUser(result.user);
                const userData = await getUserData(result.user.uid);
                if(!userData){
                    setUser(null);
                    throw new Error('usuario nao encontrado no banco de dados');
                }

            } else {
                throw new Error('Erro de usuário');
            }
        }
        catch (error) {
            const firebaseError = error as FirebaseError;
            setError(true);
            setErrorMessage(firebaseError.message);
        }
    }

    return (
        <main className={`admin-container`}>
            {!user ? <form className='admin-form' onSubmit={handleSubmit}>
                <div className='admin-input__wrapper'>
                    <label htmlFor='emailinput'>Digite seu email</label>
                    <input id='emailinput' onChange={(e) => { setEmail(e.target.value); setError(false) }} value={email} type='email' autoComplete='current-password' />
                </div>
                <div className='admin-input__wrapper'>
                    <label htmlFor='passwordinput'>Digite sua senha</label>
                    <input id='passwordinput' onChange={(e) => { setPassword(e.target.value); setError(false) }} value={password} type='password' autoComplete='current-password' />
                </div>
                {error && <p className={`admin-form_error__message`}>{errorMessage}</p>}
                <button type='submit'>Logar</button>
            </form> :<LoggedSection />}
        </main>

    )
}

export default Admin