
import axios from "axios";

export const fetchCurrentWeather = async (query) => {
    const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
    const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecastData = async (city) => {
    const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data.daily;
    } catch (error) {
        throw error;
    }
};
export const fetchWeatherAlerts = async (query) => {
    const apiKey = "79feb5c58cdf33aaf74c708ce702ba29"; 
    const baseUrl = `https://api.openweathermap.org/data/2.5/onecall`;

    const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
    );
    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) throw new Error("Location not found");

    const { lat, lon } = geoData[0];
    const alertUrl = `${baseUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${apiKey}`;

    const response = await fetch(alertUrl);
    const data = await response.json();

    if (data.alerts && data.alerts.length > 0) {
        const alert = data.alerts[0];
        return {
            message: alert.description,
            timestamp: alert.start,
        };
    }
    return null;
};
export const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const apiKey = '376956a6049bffc220eed12aacb3d313'; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric';

    try {
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        if (error.response) {
            
            console.error("Error fetching weather data:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("Error fetching weather data: No response received", error.request);
        } else {
            console.error("Error fetching weather data:", error.message);
        }
        throw error; 
    }
};

