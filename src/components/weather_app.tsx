import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch weather data function
const fetchWeather = async (
  latitude: number,
  longitude: number
)/* : Promise<any> */ => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  return response.data.current_weather;
};

// Fetch coordinates from city name function
const fetchCoordinates = async (city: string): Promise<{ latitude: number; longitude: number }> => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
  );
  const data = response.data[0];
  return { latitude: parseFloat(data.lat), longitude: parseFloat(data.lon) };
};

const convertTemperature = (
  temp: number,
  unit: "metric" | "imperial"
): number => (unit === "imperial" ? (temp * 9) / 5 + 32 : temp);

const convertSpeed = (speed: number, unit: "metric" | "imperial"): number =>
  unit === "imperial" ? speed / 1.609 : speed;

const WeatherApp: React.FC = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    { latitude: 35.6895, longitude: 139.6917 } // Default to Tokyo
  );
  const [city, setCity] = useState<string>("");

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
      }
    );
  }, []);

  // Query weather data
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["weather", coords],
      queryFn: () => fetchWeather(coords.latitude, coords.longitude),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      enabled: Boolean(coords.latitude && coords.longitude),
    } // Prevents query from running with invalid coordinates
  );

  const handleCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCoords = await fetchCoordinates(city);
    setCoords(newCoords);
  };

  if (isLoading) return <div>Loading weather...</div>;
  if (isError) return <div>Error fetching weather data</div>;

  const temperature = convertTemperature(data.temperature, unit);
  const windSpeed = convertSpeed(data.windspeed, unit);

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
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
