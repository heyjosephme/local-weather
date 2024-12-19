import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { LocationData } from "../types";

interface LocationPanelProps {
  onLocationUpdate: (location: LocationData) => void;
}

export const LocationPanel: React.FC<LocationPanelProps> = ({
  onLocationUpdate,
}) => {
  const [address, setAddress] = useState<string>("");

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationUpdate({
            address: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
      );
    }
  };

  const handleAddressSubmit = () => {
    onLocationUpdate({ address });
  };

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
            onClick={handleGeolocation}
            className="w-full flex items-center justify-center"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Use My Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
