// types.ts
export interface LocationData {
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherData {
  //temperature?: number;
  //condition?: string;
  // Add more weather properties as needed
  daily: {
    temperature_2m_min: number;
    temperature_2m_max: number;
  };
}
