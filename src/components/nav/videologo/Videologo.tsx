import './videologo.scss';
import videologo from './../../../assets/videos/videologo.webm';

function Videologo() {
    return (
        <video
            src={videologo}
            autoPlay
            loop
            muted
            className="nav-video"
        />
    )
}

export default Videologo