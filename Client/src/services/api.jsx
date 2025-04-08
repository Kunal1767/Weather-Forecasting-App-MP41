import axios from 'axios';

const API_KEY = "477eefdf74c08cef7dfb75e30c79ff6e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (query) => {
    const url = `${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchForecastData = async (query) => {
    const url = `${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data.list;
    } catch (error) {
        throw error;
    }
};
