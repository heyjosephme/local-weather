import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react';

// Sample weather data structure
type WeatherData = {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'windy';
  location: string;
};

const WeatherCard = () => {
  // This would normally come from your weather API
  const weatherData: WeatherData = {
    temperature: 72,
    condition: 'sunny',
    location: 'San Francisco'
  };

  // Map weather conditions to icons and background classes
  const weatherConfigs = {
    sunny: {
      icon: Sun,
      bgClass: 'bg-gradient-to-br from-yellow-300 to-blue-400',
      iconColor: 'text-yellow-500'
    },
    cloudy: {
      icon: Cloud,
      bgClass: 'bg-gradient-to-br from-gray-300 to-blue-400',
      iconColor: 'text-gray-600'
    },
    rainy: {
      icon: CloudRain,
      bgClass: 'bg-gradient-to-br from-blue-400 to-gray-600',
      iconColor: 'text-blue-500'
    },
    snowy: {
      icon: CloudSnow,
      bgClass: 'bg-gradient-to-br from-blue-100 to-gray-300',
      iconColor: 'text-blue-200'
    },
    stormy: {
      icon: CloudLightning,
      bgClass: 'bg-gradient-to-br from-gray-700 to-blue-900',
      iconColor: 'text-yellow-400'
    },
    windy: {
      icon: Wind,
      bgClass: 'bg-gradient-to-br from-blue-200 to-gray-400',
      iconColor: 'text-gray-500'
    }
  };

  const config = weatherConfigs[weatherData.condition];
  const WeatherIcon = config.icon;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className={`relative overflow-hidden w-80 h-96 rounded-3xl shadow-xl ${config.bgClass} transition-all duration-500 ease-in-out transform hover:scale-105`}>
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-white rounded-full opacity-20
                animate-float
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Weather content */}
        <div className="relative flex flex-col items-center justify-center h-full p-6 text-white">
          <div className="mb-4">
            <WeatherIcon
              size={80}
              className={`${config.iconColor} animate-weather-icon transition-all duration-500`}
            />
          </div>
          <h2 className="mb-2 text-4xl font-bold">{weatherData.temperature}°F</h2>
          <p className="mb-4 text-xl capitalize">{weatherData.condition}</p>
          <p className="text-lg">{weatherData.location}</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes weather-icon {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-weather-icon {
          animation: weather-icon 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherCard;
