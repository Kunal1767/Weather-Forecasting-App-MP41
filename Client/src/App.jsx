import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchForecastData } from "./services/api";

import SearchEngine from "./components/SearchEngine";
import Forecast from "./components/Forecast";
import "./App.css";

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });
  const [forecastData, setForecastData] = useState([]);
  const [currentLocationWeather, setCurrentLocationWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [showModal, setShowModal] = useState(false);

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    const currentDate = new Date();
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const fetchData = async (city) => {
    setWeather({ loading: true, data: {}, error: false });
    try {
      const currentWeather = await fetchCurrentWeather(city);
      const forecast = await fetchForecastData(city);
      setWeather({ data: currentWeather, loading: false, error: false });
      setForecastData(forecast);
    } catch (error) {
      setWeather({ loading: false, data: {}, error: true });
      console.error("Error fetching data:", error);
    }
  };

 
  const search = async (event) => {
    event.preventDefault();
    if (query.trim() && (event.type === "click" || (event.type === "keypress" && event.key === "Enter"))) {
      fetchData(query);
    }
  };

  useEffect(() => {
    fetchData("Hathras");
  }, []);

  return (
    <div className="App">
      <div className="search-container">
        <SearchEngine query={query} setQuery={setQuery} search={search} />
      </div>

      {weather.loading && <h4>Searching...</h4>}
      {weather.error && <span className="error-message">Sorry, city not found. Please try again.</span>}
      {weather.data.main && <Forecast weather={weather} forecastData={forecastData} toDate={toDate} />}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            {currentLocationWeather.loading && <h4>Fetching weather for your location...</h4>}
            {currentLocationWeather.error && <div>Unable to fetch weather for your location.</div>}
            {currentLocationWeather.data.main && (
              <div>
                <h2>Your Location: {currentLocationWeather.data.name}, {currentLocationWeather.data.sys.country}</h2>
                <p>Temperature: {currentLocationWeather.data.main.temp}°C</p>
                <p>Condition: {currentLocationWeather.data.weather[0].description}</p>
                <p>Humidity: {currentLocationWeather.data.main.humidity}%</p>
                <p>Wind Speed: {currentLocationWeather.data.wind.speed} m/s</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;