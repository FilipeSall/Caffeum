import './Error.scss';
import errorImg from '../../assets/imgs/error404.webp';
import Seo from '../../components/seo/Seo';

function Error() {
    return (
        <>
            <Seo
                title='404 | Página não encontrada'
                description='Desculpa, mas não encontramos esta página.'
            />
            <div className={`error-container`}>
                <img src={errorImg} alt='Error 404' />
                <p>Desculpe, a página que você está procurando não existe.</p>
            </div>
        </>
    )
}

export default Error