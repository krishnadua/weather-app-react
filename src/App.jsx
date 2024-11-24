import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom CSS for futuristic UI

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      // Build the API URL with the entered city
      const apiKey = 'f7d7583328424e4b98245448242411';
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

      // Fetch weather data using Axios
      const response = await axios.get(url);
      const data = response.data;

      // Extract relevant weather details
      const temperature = `${data.current.temp_c}°C`;
      const condition = data.current.condition.text;
      const cityName = data.location.name;
      const region = data.location.region;
      const country = data.location.country;

      setWeatherData({ temperature, condition, cityName, region, country });
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <div className="weather-card">
        <h1 className="text-center futuristic-text">Weather App</h1>
        <div className="input-container">
          <input
            type="text"
            className="form-input"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="search-btn" onClick={handleSearch}>
            Get Weather
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h3 className="city-info">
              {weatherData.cityName}, {weatherData.region}, {weatherData.country}
            </h3>
            <div className="weather-details">
              <p className="temperature">{weatherData.temperature}</p>
              <p className="condition">{weatherData.condition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
