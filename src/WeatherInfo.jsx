import SearchBox from './SearchBox.jsx'
import InfoBox from './InfoBox.jsx'
import FunCard from "./FunCard.jsx";
import { useState } from 'react'

export default function WeatherInfo(){

    const [weatherInfo, setWeatherInfo] = useState({
        city: "Wonderland",
        country: "FantasyLand",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        windspeed: 12,
        winddirection: 180,
        weather: "Haze",
        uvIndex: 6, // new
        pollution: "Moderate", // new
        comfortIndex: "Slightly warm, drink water 💧", // new
        outfit: "👕 Light T-shirt & Sunglasses 🕶️", // new
        moodTip: "☕ Perfect evening for coffee & a book!", // new
        });

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo)
    }
    return (
    <div style={{ textAlign: "center" }}>
        <h2>Weather Now</h2>
        <SearchBox updateInfo={updateInfo} />

        {/* Weather Info centered */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <InfoBox weather={weatherInfo} />
        </div>

        {/* Fun Card centered */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <FunCard weatherInfo={weatherInfo} />
        </div>
    </div>
    );

}