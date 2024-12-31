import React, { useState, useEffect, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData, LocationData } from "../types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface WeatherPanelProps {
  location?: LocationData;
}

interface ResponseProps {
  data: { daily: { temperature_2m_min: number; temperature_2m_max: number } };
}
// Fetch weather data function
const fetchWeather = async (
  latitude: number,
  longitude: number,
): Promise<ResponseProps> => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=1`,
  );
  return response.data; //.current_weather;
};

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const fetchWeatherCallback = useCallback(() => {
    if (location?.latitude && location?.longitude) {
      return fetchWeather(location.latitude, location.longitude);
    }
  }, [location]);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["weather", location],
    queryFn: fetchWeatherCallback,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: Boolean(location?.latitude && location?.longitude),
  });

  return (
    <Card className="md:col-span-9 lg:col-span-10">
      <CardHeader>
        <CardTitle>
          {location ? `Weather for ${location.address}` : "Current Weather"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {
          <div className="flex items-center justify-center h-full">
            {isLoading ? (
              <p>Loading weather...</p>
            ) : isError ? (
              <p>Error fetching weather data</p>
            ) : (
              <div>
                <p>Temperature: Min: {data?.daily.temperature_2m_min}°C</p>
                <p>Temperature: Max: {data?.daily.temperature_2m_max}°C</p>
                <p>
                  Location: {location?.latitude} {location?.longitude}
                </p>
                {/* <p>Condition: {data?.condition}</p> */}
              </div>
            )}
          </div>
        }
        <WeatherCard />
      </CardContent>
    </Card>
  );
};
