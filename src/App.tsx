import { useState } from 'react'
import './App.css'

interface Weather {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

function App() {

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
      <div>
        <h1>Paircast</h1>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
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

    </>
  )
}

export default App
