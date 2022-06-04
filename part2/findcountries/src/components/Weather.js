import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ city, latlng }) => {
    const [weather, setWeather] = useState(null)

    const weatherHook = () => {
        const api_key = process.env.REACT_APP_WEATHER_API_KEY
        const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`

        axios
            .get(api_url)
            .then(
                response => 
                    setWeather(response.data)
            )
    }
    useEffect(weatherHook, [latlng])
    if (weather) {
        return (
            <div>
                <h2>Weather in {city}</h2>
                <div>Temperature {weather.main.temp} Celsius</div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={`Weather Icon for ${weather.weather[0].description}`}
                />
                <div>Wind {weather.wind.speed} m/s</div>
            </div>
        )
    } else { return null }

}

export default Weather