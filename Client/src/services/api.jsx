
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
    const apiKey = "79feb5c58cdf33aaf74c708ce702ba29"; // Replace with your actual API key
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

    // Check if alerts exist
    if (data.alerts && data.alerts.length > 0) {
        const alert = data.alerts[0]; // Fetch the first alert
        return {
            message: alert.description,
            timestamp: alert.start,
        };
    }

    // Return null if no alerts
    return null;
};

