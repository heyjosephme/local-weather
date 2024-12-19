import React, { useState } from "react";
import { LocationPanel } from "./LocationPanel";
import { WeatherPanel } from "./WeatherPanel";
import { LocationData, WeatherData } from "../types";

export const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<LocationData | undefined>();
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();

  const handleLocationUpdate = async (newLocation: LocationData) => {
    setLocation(newLocation);
    // Here you would typically fetch weather data based on the location
    // const weather = await fetchWeatherData(newLocation);
    // setWeatherData(weather);
  };

  return (
    <div className="grid md:grid-cols-12 h-screen w-full bg-gray-100 p-2 md:p-4 gap-4">
      <LocationPanel onLocationUpdate={handleLocationUpdate} />
      <WeatherPanel weatherData={weatherData} location={location} />
    </div>
  );
};

export default WeatherApp;
