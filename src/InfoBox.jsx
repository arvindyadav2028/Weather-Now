import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './InfoBox.css'

export default function InfoBox({ weather }) {

    let hotUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
    let coldUrl = "https://images.unsplash.com/photo-1608889175665-c57c35c50a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
    let rainUrl = "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

    return (
        <div className="InfoBox">
            <h3>Weather Info</h3>
            <div className='classContainer'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            height="140"
                            component="img"
                            image={(weather.humidity > 80)
                                ? rainUrl
                                : (weather.temp > 15
                                    ? hotUrl
                                    : coldUrl
                                )
                            }
                            alt="weather background"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {weather.city}, {weather.country}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <div>{weather.weather}</div>
                                <div>🌡 Temperature: {weather.temp}°C</div>
                                <div>💧 Humidity: {weather.humidity}%</div>
                                <div>🥵 Feels Like: {weather.feelslike}°C</div>
                                <div>🔽 Min: {weather.tempMin}°C</div>
                                <div>🔼 Max: {weather.tempMax}°C</div>
                                <div>💨 Windspeed: {weather.windspeed} km/h</div>
                                <div>🧭 Wind Direction: {weather.winddirection}°</div>
                                <div>🌞 UV Index: {weather.uvIndex}</div>
                                <div>🌫 Pollution: {weather.pollution}</div>
                                <div>🧾 Comfort Index: {weather.comfortIndex}</div>
                                <div>👕 Outfit Suggestion: {weather.outfit}</div>
                                <div>💡 Mood Tip: {weather.moodTip}</div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}
