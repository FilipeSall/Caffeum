const getWeatherImg = (weatherCondition: string) => {
    
    switch (weatherCondition) {
        case "Thunderstorm":
            return "https://media.tenor.com/B14wu9T3Dp8AAAAC/storm-staring.gif";
        case "Drizzle":
            return "https://media.tenor.com/xQu_Gj4VDckAAAAC/good-morning-morning.gif";
        case "Rain":
            return 'https://media.tenor.com/9pCiAd-nqIQAAAAC/bird-under-the-rain.gif';
        case "Snow":
            return "https://elle-hansen.com/wp-content/uploads/2021/09/2020holidaydog1x1_v03_eh-1.gif?w=500&h=500&crop=1";
        case "Mist":
            return "https://media.tenor.com/RHiJpN34A3IAAAAC/foggy-fog.gif";
        case "Haze":
            return "https://media.tenor.com/RHiJpN34A3IAAAAC/foggy-fog.gif";
        case "Clear":
            return "https://elle-hansen.com/wp-content/uploads/2021/09/thanksgiving2020_v04_eh.gif?w=2500&h=";
        case "Clouds":
            return "https://media1.tenor.com/m/ICfPH7c1WmUAAAAd/clouds-cartoon.gif";
        default:
            return "https://elle-hansen.com/wp-content/uploads/2021/09/wip1.gif?w=540&h=540&crop=1";
    }
};

export default getWeatherImg;
