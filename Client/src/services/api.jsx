
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