import './Error.scss';
import errorIcon from '../../assets/icons/error.svg';

function Error() {
    return (
        <div className={`error-container`}>
            <img alt='Algo deu errado' src={errorIcon} />
            <p>Algo deu errado!</p>
        </div>
    )
}

export default Error