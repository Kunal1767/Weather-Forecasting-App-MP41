import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather, forecastData, toDate }) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => setIsCelsius((prev) => !prev);

  const convertToFahrenheit = (temperature) => Math.round((temperature * 9) / 5 + 32);
  
  const renderTemperature = (temperature) =>
    isCelsius ? Math.round(temperature) : convertToFahrenheit(temperature);

  const getWeatherIcon = (weatherCode) => {
    const iconMapping = {
      '01': 'CLEAR_DAY',
      '02': 'PARTLY_CLOUDY_DAY',
      '03': 'CLOUDY',
      '04': 'CLOUDY',
      '09': 'RAIN',
      '10': 'RAIN',
      '11': 'THUNDERSTORM',
      '13': 'SNOW',
      '50': 'FOG'
    };
    return iconMapping[weatherCode.slice(0, 2)] || 'CLEAR_DAY';
  };

  const getFiveDayForecast = () => {
    const uniqueDays = new Set();
    return forecastData.filter((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      const isNoonForecast = date.getHours() === 12;
      
      if (!uniqueDays.has(day) && (isNoonForecast || uniqueDays.size < 5)) {
        uniqueDays.add(day);
        return true;
      }
      return false;
    }).slice(0, 5);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.name}, <span>{data.sys.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{toDate()}</span>
      </div>
      <div className="temp">
        <ReactAnimatedWeather
          icon={getWeatherIcon(data.weather[0].icon)}
          size={100}
          color="#1e2432"
        />
        {renderTemperature(data.main.temp)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.weather[0].description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size={40} />
          <p className="wind">{data.wind.speed} m/s</p>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size={40} />
          <p className="humidity">{data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.length === 0 ? (
            <p>No forecast data available.</p>
          ) : (
            getFiveDayForecast().map((day) => (
              <div className="day" key={day.dt}>
                <p className="day-date">{formatDate(day.dt)}</p>
                <ReactAnimatedWeather
                  icon={getWeatherIcon(day.weather[0].icon)}
                  size={50}
                  color="#1e2432"
                />
                <p className="day-temperature">
                  {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Forecast;