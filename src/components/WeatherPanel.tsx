import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "../types";

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
      <CardContent>
        <div className="flex items-center justify-center h-full">
          {weatherData ? (
            <div>
              {/* Weather display implementation */}
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Condition: {weatherData.condition}</p>
            </div>
          ) : (
            <p className="text-gray-500">
              Select a location to view weather information
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
