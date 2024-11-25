import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { fetchForecastData } from "../services/api";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecastData = async () => {
      setLoading(true);
      try {
        const dailyData = await fetchForecastData(data.city);
        setForecastData(dailyData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching forecast data:", error);
      }
    };

    if (data.city) {
      getForecastData();
    }
  }, [data.city]);

  // Function to format the date into a readable date (e.g., "Nov 26, 2024")
  const formatDate = (dateString) => {
    const date = new Date(dateString * 1000);  // Convert timestamp to Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric' };  // Format date as "Nov 26, 2024"
    return date.toLocaleDateString("en-US", options);
  };

  // Function to get "Today", "Tomorrow", or the formatted date for future dates
  const getDayLabel = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const date = new Date(dateString * 1000); // Convert timestamp to Date object

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return formatDate(dateString); // For future dates, return the full formatted date
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

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const convertToFahrenheit = (temperature) => Math.round((temperature * 9) / 5 + 32);
  const renderTemperature = (temperature) =>
    isCelsius ? Math.round(temperature) : convertToFahrenheit(temperature);

  if (loading) {
    return <div>Loading forecast...</div>;
  }

  return (
    <div>
      <div className="city-name">
        <h2>{data.city}, <span>{data.country}</span></h2>
      </div>
      <div className="date"><span>{getCurrentDate()}</span></div>
      <div className="temp">
        {data.condition.icon_url && (
          <img src={data.condition.icon_url} alt={data.condition.description} className="temp-icon" />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.condition.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" />
          <p className="wind">{data.wind.speed} m/s</p>
          <p>Wind speed</p>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <p className="humidity">{data.temperature.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.slice(0, 5).map((date) => (
            <div className="day" key={date.time}>
              <p className="day-name">{getDayLabel(date.time)}</p>  {/* Display "Today", "Tomorrow", or date */}
              {date.condition.icon_url && (
                <img className="day-icon" src={date.condition.icon_url} alt={date.condition.description} />
              )}
              <p className="day-temperature">
                {Math.round(date.temperature.minimum)}° / {Math.round(date.temperature.maximum)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
