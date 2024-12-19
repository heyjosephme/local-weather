// src/App.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import WeatherApp from "./components/weather_app.tsx";

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>("");

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
