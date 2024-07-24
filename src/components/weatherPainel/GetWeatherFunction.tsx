import {  weatherApiKey } from "../../config/env";

export const getWeather = async (city:string) => {
    
    const apiKey = weatherApiKey;
    const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch weather data: ${res.status}`);
        }
        const data = await res.json();
        return data;
    }
    catch (error: unknown) {
        console.log(error);
    }
}

