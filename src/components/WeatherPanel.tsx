import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData, LocationData } from "../types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface WeatherPanelProps {
  location?: LocationData;
}

// Fetch weather data function
const fetchWeather = async (
  latitude: number,
  longitude: number,
): Promise<any> => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );
  return response.data.current_weather;
};

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();

  return (
    <Card className="md:col-span-9 lg:col-span-10">
      <CardHeader>
        <CardTitle>
          {location ? `Weather for ${location.address}` : "Current Weather"}
        </CardTitle>
      </CardHeader>
      {/* Weather display implementation */}
      <CardContent>
        {
          <div className="flex items-center justify-center h-full">
            {
              /* isLoading ? (
              <p>Loading weather...</p>
            ) : isError ? (
              <p>Error fetching weather data</p>
            ) : ( */
              <div>
                <p>
                  Temperature: Min: {weatherData?.daily.temperature_2m_min}°C
                </p>
                <p>
                  Temperature: Max: {weatherData?.daily.temperature_2m_max}°C
                </p>
                <p>
                  Location: {location?.latitude} {location?.longitude}
                </p>
                {/* <p>Condition: {data?.condition}</p> */}
              </div>
            }
          </div>
        }
      </CardContent>
    </Card>
  );
};
