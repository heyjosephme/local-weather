// src/App.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import WeatherApp from "./components/weather_app.tsx";

interface Location {
  latitude: number;
  longitude: number;
}

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError("");
      },
      () => {
        setError("Unable to retrieve your location");
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Local Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={getCurrentLocation}
              className="w-full flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Get Current Location
            </Button>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {location && (
              <div className="text-sm text-gray-600">
                Latitude: {location.latitude.toFixed(4)}°
                <br />
                Longitude: {location.longitude.toFixed(4)}°
              </div>
            )}
          </div>
        </CardContent>
        <WeatherApp />
      </Card>
    </div>
  );
}

export default App;
