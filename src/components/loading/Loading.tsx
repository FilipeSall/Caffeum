import './Loading.scss';
import loadingicon from '../../assets/icons/loading.svg';

function Loading() {
    return (
        <div className={`loading-container`}>
            <img alt='Carregando...' src={loadingicon} />
        </div>
    )
}

export default Loading