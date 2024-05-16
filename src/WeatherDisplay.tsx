import { useState } from 'react'


interface Weather {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

function WeatherDisplay() {

    // State to hold city name input by the user
    const [city, setCity] = useState('');
    // State to hold the weather data
    const [weather, setWeather] = useState<Weather | null>(null);

    const API_KEY = '';

    // Function to fetch weather data
    const fetchWeather = async () => {
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Added units=metric to get temperature in Celsius
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.main) {
                    setWeather(data);
                } else {
                    alert('City not found');
                    setWeather(null);
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                alert('Failed to fetch weather');
            }
        } else {
            alert('Please enter a city name');
        }
    };


    return (
        <>
            <div className="border-2 p-4">
                <input
                    className="border-2 p-2 w-full mb-2"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full mb-4" onClick={fetchWeather}>Get Weather</button>
                <div>
                    {weather && weather.main ? (
                        <>
                            <h2>{weather.name}</h2>
                            <p>Temperature: {weather.main.temp}°C</p>
                            <p>Weather: {weather.weather[0].description}</p>
                        </>
                    ) : (
                        <p>No weather data</p>
                    )}
                </div>

            </div>


        </>
    )
}

export default WeatherDisplay
