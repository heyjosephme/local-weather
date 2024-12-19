// types.ts
export interface LocationData {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherData {
  temperature?: number;
  condition?: string;
  // Add more weather properties as needed
}
