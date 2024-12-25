import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData, LocationData } from "../types";

interface WeatherPanelProps {
  weatherData?: WeatherData;
  location?: LocationData;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({
  weatherData,
  location,
}) => {
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
                {/* <p>
                  Location: {location?.latitude} {location?.longitude}
                </p> */}
                {/* <p>Condition: {data?.condition}</p> */}
              </div>
            }
          </div>
        }
      </CardContent>
    </Card>
  );
};
