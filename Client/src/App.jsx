import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchForecastData } from "./Services/api";
import SearchEngine from "./components/SearchEngine";
import Forecast from "./components/Forecast";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });
  const [forecastData, setForecastData] = useState([]);

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      try {
        const currentWeather = await fetchCurrentWeather(query);
        setWeather({ data: currentWeather, loading: false, error: false });

        const forecast = await fetchForecastData(query);
        setForecastData(forecast);
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        console.log("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentWeather = await fetchCurrentWeather("Rabat");
        setWeather({ data: currentWeather, loading: false, error: false });

        const forecast = await fetchForecastData("Rabat");
        setForecastData(forecast);
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        <Forecast weather={weather} forecastData={forecastData} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
