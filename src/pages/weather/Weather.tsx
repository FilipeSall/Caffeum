import { useEffect, useRef, useState } from 'react';
import { WeatherProps } from '../../Global/Types';
import { getWeather } from '../../components/weatherPainel/GetWeatherFunction';
import './Weather.scss';
import Loading from '../../components/loading/Loading';
import WeatherInfo from './weatherinfo/WeatherInfo';
import CityBtn from './cityBtN/CityBtn';
import Modal from './modal/Modal';
import Seo from '../../components/seo/Seo';

const Weather: React.FC = () => {
    const [weatherData, setWeather] = useState<WeatherProps | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [city, setCity] = useState<string>('brasilia');
    const [citesModal, setCitesModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                setError(false);
                const data = await getWeather(city);
                setWeather(data);
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();

    }, [city]);

    //referência do botão para o modal para funcionar o toogle corretamente
    const btnRef = useRef(null);

    return (
        <>
            <Seo
                title='Caffeum | Painel climático'
                description='Painel climático com informações sobre o clima de várias cidades'
            />

            <main className='weather-page'>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p className='weatherDescription'>Não foi possível acessar os dados do clima. Tente novamente mais tarde.</p>
                ) : (
                    weatherData && <WeatherInfo weatherData={weatherData} />
                )}

                <div className='wather-page_modal_wrapper'>
                    <CityBtn setState={setCitesModal} state={citesModal} weatherData={weatherData} btnRef={btnRef} />
                    {citesModal && <Modal setState={setCity} setModal={setCitesModal} btnRef={btnRef} />}
                </div>
            </main>
        </>
    );
};

export default Weather