import './citybtn.scss';
import gpsicon from '../../../assets/icons/gps.svg';
import { Dispatch, SetStateAction } from 'react';
import { WeatherProps } from '../../../Global/Types';

type CityBtnProps = {
    setState:  Dispatch<SetStateAction<boolean>>,
    state:boolean,
    weatherData?:WeatherProps,
    btnRef?:any;
}

function CityBtn({ setState, state, btnRef}: CityBtnProps) {

    const handleClick = () => {
        setState(!state);
    }

    return (
        <button className='setup-city__btn' onClick={handleClick} ref={btnRef} >
            <img src={gpsicon} alt="gps icon" className="citybtn__icon" />
        </button>
    )
}

export default CityBtn