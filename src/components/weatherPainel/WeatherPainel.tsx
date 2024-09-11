import { useEffect, useState } from 'react';
import './WeatherPainel.scss';
import { getWeather } from './GetWeatherFunction';
import GetIconWeather from './GetImgFunction';
import { NavLink, useLocation } from 'react-router-dom';
import { WeatherProps } from '../../Global/Types';
import Timer from './Timer';

function WeatherPainel() {

    const location = useLocation();

    const [weather, setWeater] = useState<WeatherProps>();
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchHandleData = async () => {
            const newWeather = await getWeather('brasilia');
            setWeater(newWeather)

        }
        fetchHandleData()
    }, [])

    useEffect(() => {
        setActive(location.pathname === '/weather');
    }, [location.pathname]);

    const handleMouseEnter = () => {
        if (!active) {
            setActive(true);
        }
    };

    const handleMouseLeave = () => {
        if (location.pathname !== '/weather') {
            setActive(false);
        }
    };

    const weatherCondition = weather?.weather[0].description;

    return (
        <NavLink to='/weather' className={`weather-painel__container`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {weather &&
                <>
                    {weatherCondition && GetIconWeather(weatherCondition)}
                    {active &&
                        <div className='weather-painel__text-conditions'>
                            {<Timer />}
                        </div>
                    }
                </>
            }

        </NavLink>
    )
}

export default WeatherPainel