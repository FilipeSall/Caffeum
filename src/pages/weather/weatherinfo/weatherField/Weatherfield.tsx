import './weatherfield.scss';

type weatherValuesProps = {
    weatherData: string,
    weatherDescription?: string,
    icon?: React.ReactNode
}

type WeatherFieldProps = {
    icon: React.ReactNode,
    isDescriptionType?: boolean,
    title: string,
    weatherValues: weatherValuesProps[],
}

function Weatherfield({ icon, title, weatherValues, isDescriptionType }: WeatherFieldProps) {

    return (
        <fieldset className='weatherfield'>
            <legend>{icon}{title}</legend>
            {weatherValues.map((weather, i) => (
                <div className='weatherStatus' key={i}>
                    <p className='weatherStatus-value' id={isDescriptionType ? 'weatherStatus-capitalized__description' : ''}>
                        {weather.weatherData}
                    </p>
                    <p className='weatherStatus-description'>{weather.icon && weather.icon}{weather.weatherDescription}</p>
                </div>
            ))}
        </fieldset>
    )
}

export default Weatherfield