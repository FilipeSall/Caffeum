import clearskyday from '../../assets/weatherPanel/clearskyday.webp'
import clearskynight from '../../assets/weatherPanel/clearskynight.webp'
import cloudsday from '../../assets/weatherPanel/cloudsday.webp';
import cloudsnight from '../../assets/weatherPanel/cloudsnight.webp';
import thunderstormday from '../../assets/weatherPanel/thunderstormday.webp';
import thunderstormnight from '../../assets/weatherPanel/thunderstormnight.webp';
import drizzleday from '../../assets/weatherPanel/drizzleday.webp';
import drizzlenight from '../../assets/weatherPanel/drizzlenight.webp';
import snowday from '../../assets/weatherPanel/snowday.webp';
import snownight from '../../assets/weatherPanel/snownight.webp';
import atmosphereday from '../../assets/weatherPanel/atmosphereday.webp';
import atmospherenight from '../../assets/weatherPanel/atmospherenight.webp';

export default function GetIconWeather(weatherCondition: string) {

    const date = new Date();
    const hours = date.getHours();

    const dayTime = hours >= 7 && hours <= 18;

    switch (weatherCondition) {
        case "Thunderstorm":
            return (
                <img src={dayTime ? thunderstormday : thunderstormnight} alt="Thunderstorm" />
            );
        case "Drizzle":
            return (
                <img src={dayTime ? drizzleday : drizzlenight} alt="Drizzle" />
            );
        case "Rain":
            return (
                <img src={dayTime ? thunderstormday : thunderstormnight} alt="Rain" />
            );
        case "Snow":
            return (
                <img src={dayTime ? snowday : snownight} alt="Snow" />
            );
        case "Atmosphere":
            return (
                <img src={dayTime ? atmosphereday : atmospherenight} alt="Atmosphere" />
            );
        case "Clear":
            return (
                <img src={dayTime ? clearskyday : clearskynight} alt="Clear" />
            );
        case "Clouds":
            return (
                <img src={dayTime ? cloudsday : cloudsnight} alt="Clouds" />
            );
        default:
            return (
                <img src={dayTime ? cloudsday : cloudsnight} alt="Default" />
            );
    }
}