import { useState } from 'react'


interface Weather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


function WeatherDisplay() {

    // State to hold city name input by the user
    const [city, setCity] = useState('');
    // State to hold the weather data
    const [weather, setWeather] = useState<Weather | null>(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

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

    // Helper function to format Unix timestamp to a readable date
    const formatDate = (unixTimestamp: number) => {
        const date = new Date(unixTimestamp * 1000);
        // Format the time as hour and minute. Adjust 'en-US' to locale if needed.
        const timeString = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Set to false if you want 24-hour format
        });

        return timeString;

    };

    return (
        <>
            <div className="border-2 p-4 bg-white bg-opacity-60 rounded-lg">
                <input
                    className="border-2 p-2 w-full mb-2 rounded-lg"
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full mb-4 rounded-lg" onClick={fetchWeather}>Get Weather</button>
                <div>
                    {weather && weather.main ? (
                        <div className="flex flex-col items-center space-y-4">
                            <p>{weather.name}</p>
                            <h2 className="text-4xl font-bold">{weather.main.temp}°C</h2>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="{weather.weather[0].description}" className="w-32 h-32" />
                            <p>{weather.weather[0].description}</p>
                            <p>Feels like: {weather.main.feels_like}°C</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            <div className="flex justify-between w-full px-10">
                                <div>
                                    <p className="text-sm">Min: {weather.main.temp_min}°C</p>
                                    <p className="text-sm">Max: {weather.main.temp_max}°C</p>
                                </div>
                                <div>
                                    <p className="text-sm">Sunrise: {formatDate(weather.sys.sunrise)}</p>
                                    <p className="text-sm">Sunset: {formatDate(weather.sys.sunset)}</p>
                                </div>
                            </div>


                            <p className="pt-4 text-xs self-start">Last updated: {formatDate(weather.dt)} </p>

                        </div>

                    ) : (
                        <p className="text-center">No weather data</p>
                    )}
                </div>

            </div>


        </>
    )
}

export default WeatherDisplay
