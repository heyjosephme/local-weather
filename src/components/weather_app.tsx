import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const convertTemperature = (
  temp: number,
  unit: "metric" | "imperial",
): number => (unit === "imperial" ? (temp * 9) / 5 + 32 : temp);

const convertSpeed = (speed: number, unit: "metric" | "imperial"): number =>
  unit === "imperial" ? speed / 1.609 : speed;

const WeatherApp: React.FC = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    { latitude: 35.6895, longitude: 139.6917 }, // Default to Tokyo
  );

  // Fetch user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        console.warn("Failed to fetch location, using default (Tokyo).");
      },
    );
  }, []);

  const temperature = convertTemperature(data.temperature, unit);
  const windSpeed = convertSpeed(data.windspeed, unit);

  return (
    <div>
      <h1>Weather App</h1>
      <p>
        Temperature: {temperature.toFixed(1)}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>
        Wind Speed: {windSpeed.toFixed(1)} {unit === "metric" ? "km/h" : "mph"}
      </p>
      <button
        onClick={() =>
          setUnit((prev) => (prev === "metric" ? "imperial" : "metric"))
        }
      >
        Switch to {unit === "metric" ? "Imperial" : "Metric"}
      </button>
    </div>
  );
};

export default WeatherApp;
