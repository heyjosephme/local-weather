import { Coordinates } from "./types";

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return Error;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(getGeolocationErrorMessage(error)));
      },
    );
  });
};

// Helper function to get meaningful error messages
const getGeolocationErrorMessage = (
  error: GeolocationPositionError,
): string => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation";
    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable";
    case error.TIMEOUT:
      return "The request to get user location timed out";
    default:
      return "An unknown error occurred";
  }
};
