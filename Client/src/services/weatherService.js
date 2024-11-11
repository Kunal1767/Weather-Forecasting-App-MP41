const API_KEY = "759e6e5b0ff91d050b8e02be032cf8c9";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });


    return fetch(url).then((res) => res.json());
};
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };




