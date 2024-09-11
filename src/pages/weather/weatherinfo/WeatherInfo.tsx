import { FaCloud, FaThermometerHalf, FaTint } from 'react-icons/fa';
import { PiWindFill } from "react-icons/pi";
import { LiaWindSolid } from "react-icons/lia";
import { WeatherProps } from '../../../Global/Types';
import getWeatherImg from '../getWeatherImg';
import './WeatherInfo.scss';
import Weatherfield from './weatherField/Weatherfield';


const WeatherInfo: React.FC<{ weatherData: WeatherProps }> = ({ weatherData }) => {

    const fieldsetList = [
        {
            title: 'Descrição',
            icon: <FaCloud aria-label='cobertura de nuvens' size={22} />,
            weatherValues: [
                {
                    weatherData: `${weatherData.weather[0].description}`
                }
            ],
            isDescriptionType: true,
        },
        {
            title: 'Temperatura',
            icon: <FaThermometerHalf aria-label='Temperatura' size={22} />,
            weatherValues: [
                {
                    weatherData: `${weatherData.main.temp}°`,
                    weatherDescription: 'Temperatura atual',
                },
                {
                    weatherData: `${weatherData.main.feels_like}°`,
                    weatherDescription: 'Sensação térmica'
                }
            ]
        },
        {
            title: 'Condições Atmosféricas',
            icon: <LiaWindSolid aria-label='Valores adicionais' size={22} />,
            weatherValues: [
                {
                    weatherData: `${weatherData.main.humidity}%`,
                    weatherDescription: 'Umidade',
                    icon: <FaTint aria-label='Umidade' />
                },
                {
                    weatherData: `${weatherData.wind.speed}/s`,
                    weatherDescription: 'Vento',
                    icon: <PiWindFill aria-label='Velocidade do vento' size={14} />
                }
            ]
        },

    ]

    return (
        <div className='weather-page__wrapper'>
            <div className='weatherWrapper'>
                <div className='weatherImg'>
                    <img
                        src={getWeatherImg(weatherData.weather[0].main)}
                        alt="Weather animation"
                        className='weatherAnimation'
                        width={500}
                        height={500}
                    />
                </div>
                <div className='weatherInfo'>
                    <h1 className={`cityName ${weatherData.name.length > 12 ? 'cityName-superlarge_length' : (weatherData.name.length >= 9 ? 'cityName-large_length' : 'cityName-normal_length')}`}>
                        {weatherData.name}
                    </h1>
                    <div className='weatherInfo-fieldsets_wrapper'>
                        {fieldsetList.map((field, i) => (
                            <Weatherfield
                                key={i}
                                icon={field.icon}
                                title={field.title}
                                weatherValues={field.weatherValues}
                                isDescriptionType={field.isDescriptionType}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;
