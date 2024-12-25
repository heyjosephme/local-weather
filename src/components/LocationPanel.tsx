import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { LocationData, WeatherData } from "../types";
import { getCurrentLocation } from "@/services/geolocation";
import { Coordinates } from "@/services/geolocation/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface LocationPanelProps {
  onLocationUpdate: (location: LocationData) => void;
  setWeatherData: (weatherData: WeatherData) => void;
  setLocation: (location: LocationData) => void;
  location?: LocationData;
}

// Fetch weather data function
const fetchWeather = async (
  latitude: number,
  longitude: number
) /* : Promise<any> */ => {
  console.log(`Fetching weather for ${latitude}, ${longitude}`);
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=1`
  );
  console.log(`Weather response: ${JSON.stringify(response.data)}`);
  return response.data; //.current_weather;
};

export const LocationPanel: React.FC<LocationPanelProps> = ({
  onLocationUpdate,
  setWeatherData,
  setLocation,
  location,
}) => {
  const [address, setAddress] = useState<string>("");
  /* const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  }); */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In your React component
  const handleGetLocation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const location = await getCurrentLocation();
      setLocation({
        address: "",
        latitude: location.latitude as number,
        longitude: location.longitude as number,
      });
      const data: WeatherData = await fetchWeather(
        location.latitude as number,
        location.longitude as number
      );
      setWeatherData(data);
      //setWeatherData(location);
      //console.log("Location:", location);
      // Do something with the location
    } catch (error) {
      if (error instanceof Error) {
        //console.error("Error getting location:", error.message);
        setError(error.message);
      } else {
        //console.error("An unexpected error occurred:", error);
        setError("Failed to get location");
      }
      // Handle the error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = () => {
    onLocationUpdate({ address });
  };

  /*   const fetchWeatherCallback = useCallback(() => {
    if (location?.latitude && location?.longitude) {
      return fetchWeather(location.latitude, location.longitude);
    }
  }, [location]); */

  /*   const { data, isLoading: isFetchWeatherLoading, isError, refetch } = useQuery({
    queryKey: ["weather", location],
    queryFn: fetchWeatherCallback,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: Boolean(location?.latitude && location?.longitude),
  }); */

  /*   setWeatherData(data); */

  /*   useEffect(() => {
    if (location?.latitude && location?.longitude) {
      refetch();
    }
  }, [location, refetch]); */

  return (
    <Card className="md:col-span-3 lg:col-span-2">
      <CardHeader>
        <CardTitle>Location Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mb-2"
            />
            <Button
              className="w-full flex items-center justify-center"
              variant="outline"
              onClick={handleAddressSubmit}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Search Location
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">or</span>
            </div>
          </div>

          <Button
            onClick={handleGetLocation}
            className="w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting location...
              </>
            ) : (
              <>
                <Navigation className="mr-2 h-4 w-4" />
                Use My Location
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        {location?.latitude && location?.longitude && (
          <Alert className="text-sm text-gray-600">
            <AlertTitle>Location Found</AlertTitle>
            <AlertDescription>
              Latitude: {location?.latitude}
              <br />
              Longitude: {location?.longitude}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
