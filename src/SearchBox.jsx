import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './SearchBox.css'

export default function SearchBox({ updateInfo }) {

    const [city, setCity] = useState("");
    let [error, setError] = useState(false);

    // Step 1: Get coordinates from Open-Meteo Geocoding API
    let getCoordinates = async function(cityName){
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return {
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude,
                name: data.results[0].name,
                country: data.results[0].country
            };
        } else {
            throw new Error("City not found");
        }
    };

    // Step 2: Get weather info from Open-Meteo Forecast API
    let getWeatherInfo = async () => {
        try {
            const coords = await getCoordinates(city);

            let weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,temperature_2m&daily=temperature_2m_min,temperature_2m_max,uv_index_max&timezone=auto`
            );

            let jsonResponse = await weatherResponse.json();
            console.log(jsonResponse);

            // Weather description mapping
            const weatherCodeMap = {
                0: "Clear sky",
                1: "Mainly clear",
                2: "Partly cloudy",
                3: "Overcast",
                45: "Fog",
                48: "Depositing rime fog",
                51: "Light drizzle",
                61: "Slight rain",
                71: "Slight snow fall",
                80: "Rain showers",
                95: "Thunderstorm",
            };

            let code = jsonResponse.current_weather.weathercode;
            let description = weatherCodeMap[code] || "Unknown";

            const temp = jsonResponse.current_weather.temperature;
            const humidity = jsonResponse.hourly.relativehumidity_2m[0];
            const uvIndex = jsonResponse.daily.uv_index_max[0]; // max UV for today

            // Simple comfort index (scale 0–100)
            const comfortIndex =
                (100 - Math.abs(temp - 22) * 2) - Math.floor(humidity / 5);

            // Outfit suggestion
            let outfit;
            if (temp >= 30) outfit = "🩳 Light clothes, stay cool!";
            else if (temp >= 20) outfit = "👕 T-shirt & jeans";
            else if (temp >= 10) outfit = "🧥 Light jacket";
            else outfit = "🧣 Warm jacket & layers";

            // Mood tip
            let moodTip;
            if (uvIndex > 7) moodTip = "☀️ High UV — wear sunscreen!";
            else if (humidity > 70) moodTip = "💧 Humid day — stay hydrated!";
            else if (temp < 5) moodTip = "❄️ Cold day — enjoy a hot drink!";
            else moodTip = "🌟 Great weather to be outside!";

            // ✅ Final result object
            const result = {
                city: coords.name,
                country: coords.country,
                weather: description,
                temp,
                feelslike: jsonResponse.hourly.apparent_temperature[0],
                humidity,
                tempMin: jsonResponse.daily.temperature_2m_min[0],
                tempMax: jsonResponse.daily.temperature_2m_max[0],
                windspeed: jsonResponse.current_weather.windspeed,
                winddirection: jsonResponse.current_weather.winddirection,
                uvIndex,
                comfortIndex,
                outfit,
                moodTip,
            };

            setError(false);
            return result;

        } catch (err) {
            throw err;
        }
    };


    let handleInputChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            console.error(err);
            setError("This place is not in database");
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="City"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleInputChange}
                    required
                />
                <br /><br />
                <Button variant="contained" type='submit'>Search</Button>
            </form>
            {error && <h2>{error}</h2>}
        </div>
    );
}
