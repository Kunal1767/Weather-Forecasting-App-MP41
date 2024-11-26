import React from "react";

const WeatherAlert = ({ type, message, lastUpdated }) => {
    const alertStyles = {
        warning: { backgroundColor: "#ffcccb", color: "#d8000c", borderColor: "#d8000c" },
        info: { backgroundColor: "#cce5ff", color: "#004085", borderColor: "#004085" },
        success: { backgroundColor: "#d4edda", color: "#155724", borderColor: "#155724" },
    };

    const style = alertStyles[type] || alertStyles.info;

    return (
        <div
            style={{
                padding: "15px",
                backgroundColor: style.backgroundColor,
                color: style.color,
                border: `1px solid ${style.borderColor}`,
                borderRadius: "5px",
                margin: "10px 0",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>⚠️ Weather Alert</h4>
            <p style={{ margin: "5px 0 0" }}>{message}</p>
            <small style={{ display: "block", marginTop: "5px", color: style.color }}>
                Last updated: {lastUpdated}
            </small>
        </div>
    );
};

export default WeatherAlert;
