import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather, forecastData }) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true);

  const formatDate = (timestamp) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => setIsCelsius((prev) => !prev);

  const convertToFahrenheit = (temperature) => Math.round((temperature * 9) / 5 + 32);
  const renderTemperature = (temperature) =>
    isCelsius ? Math.round(temperature) : convertToFahrenheit(temperature);

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.condition.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size={40} />
          <p className="wind">{data.wind.speed} m/s</p>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size={40} />
          <p className="humidity">{data.temperature.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.length === 0 ? (
            <p>No forecast data available.</p>
          ) : (
            forecastData.slice(0, 5).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-date">{formatDate(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}° / {Math.round(day.temperature.maximum)}°
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
