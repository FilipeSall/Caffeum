
import { useEffect, useState } from 'react';
import './WeatherPainel.scss';
import { getWeather } from './GetWeatherFunction';
import GetIconWeather from './GetImgFunction';
import temperatureIcon from '../../assets/icons/temperature.svg';
import humidityIcon from '../../assets/icons/humidity.svg';
import weatherIcon from '../../assets/icons/weather.svg';

interface Weather {
    weather: { description: string, }[];
    main: { temp: number, humidity: number };

}

function WeatherPainel() {

    const [weather, setWeater] = useState<Weather>();
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const fetchHandleData = async () => {
            const newWeather = await getWeather('brasilia');
            setWeater(newWeather)

        }
        fetchHandleData()
    }, [])

    const weatherCondition = weather?.weather[0].description;

    return (
        <div className={`weather-painel__container`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {weather &&
                <>
                    {weatherCondition && GetIconWeather(weatherCondition)}
                    {hover &&
                        <div className='weather-painel__text-conditions'>
                            <p className='weatherCondition-text'><img src={weatherIcon} className='weather_icon-painel' />{weatherCondition}</p>
                            <p><img src={humidityIcon} className='weather_icon-painel' /> {weather.main.humidity}</p>
                            <p><img src={temperatureIcon} className='weather_icon-painel' /> {weather.main.temp}°</p>
                        </div>
                    }
                </>
            }

        </div>
    )
}

export default WeatherPainel