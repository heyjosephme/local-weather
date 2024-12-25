import React, { useState } from "react";
import { LocationPanel } from "./LocationPanel";
import { WeatherPanel } from "./WeatherPanel";
import { LocationData, WeatherData } from "../types";

// Fetch weather data function
/* const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  return response.data.current_weather;
}; */

export const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<LocationData | undefined>();
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();

  const handleLocationUpdate = async (newLocation: LocationData) => {
    setLocation(newLocation);
    // Here you would typically fetch weather data based on the location
    //const weather = await fetchWeatherData(newLocation);
    //setWeatherData(weather);
  };

  return (
    <div className="grid md:grid-cols-12 h-screen w-full bg-gray-100 p-2 md:p-4 gap-4">
      <LocationPanel
        onLocationUpdate={handleLocationUpdate}
        setWeatherData={setWeatherData}
        location={location}
        setLocation={setLocation}
      />
      <WeatherPanel weatherData={weatherData} location={location} />
    </div>
  );
};

export default WeatherApp;
