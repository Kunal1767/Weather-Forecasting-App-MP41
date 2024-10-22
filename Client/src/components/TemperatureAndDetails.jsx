import React from "react";
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";

function TemperatureAndDetails() {
    const iconUrl = "https://your-weather-icon-url.png";
    const temp = 25;
    const feels_like = 27;
    const humidity = 65;
    const windSpeed = 12;
    const sunrise = "06:30 AM";
    const sunset = "06:45 PM";
    const temp_max = 28;
    const temp_min = 18;

    return (
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300 ">
                <p>Cloudy and mild</p>
            </div>

            <div className="flex flex-row items-center justify-between gap-14 text-white py-3 c1">
                <img src={iconUrl} alt="weather icon" className="w-20" />
                <p className="text-5xl">{`${temp}°`}</p>
                <div className="flex flex-col space-y-2 w-full  pl-6">
                    <div className="flex font-light text-sm items-center justify-start">
                        <UilTemperature size={18} className="mr-1" />
                        Real feel:
                        <span className="font-medium ml-1">{`${feels_like}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-start">
                        <UilTear size={18} className="mr-1" />
                        Humidity:
                        <span className="font-medium ml-1">{`${humidity}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-start">
                        <UilWind size={18} className="mr-1" />
                        Wind:
                        <span className="font-medium ml-1">{`${windSpeed} km/h`}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3 ">
                <UilSun />
                <p className="font-light">
                    Rise:{" "}
                    <span className="font-medium ml-1">
                        {sunrise}
                    </span>
                </p>
                <p className="font-light">|</p>

                <UilSunset />
                <p className="font-light">
                    Set:{" "}
                    <span className="font-medium ml-1">
                        {sunset}
                    </span>
                </p>
                <p className="font-light">|</p>

                <UilSun />
                <p className="font-light">
                    High:{" "}
                    <span className="font-medium ml-1">{`${temp_max}°`}</span>
                </p>
                <p className="font-light">|</p>

                <UilSun />
                <p className="font-light">
                    Low:{" "}
                    <span className="font-medium ml-1">{`${temp_min}°`}</span>
                </p>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;
