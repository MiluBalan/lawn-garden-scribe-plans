
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: Array<{ month: string; value: number }>;
  rainfall: Array<{ month: string; value: number }>;
  growthPotential: Array<{ month: string; potential: number }>;
}

export const useWeatherData = (location: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call - replace with actual weather API
        const mockData: WeatherData = {
          temperature: [
            { month: 'Jan', value: 35 },
            { month: 'Feb', value: 40 },
            { month: 'Mar', value: 50 },
            { month: 'Apr', value: 60 },
            { month: 'May', value: 70 },
            { month: 'Jun', value: 80 },
            { month: 'Jul', value: 85 },
            { month: 'Aug', value: 83 },
            { month: 'Sep', value: 75 },
            { month: 'Oct', value: 65 },
            { month: 'Nov', value: 50 },
            { month: 'Dec', value: 40 }
          ],
          rainfall: [
            { month: 'Jan', value: 2.1 },
            { month: 'Feb', value: 2.3 },
            { month: 'Mar', value: 3.1 },
            { month: 'Apr', value: 3.5 },
            { month: 'May', value: 4.2 },
            { month: 'Jun', value: 3.8 },
            { month: 'Jul', value: 3.2 },
            { month: 'Aug', value: 3.0 },
            { month: 'Sep', value: 2.8 },
            { month: 'Oct', value: 2.4 },
            { month: 'Nov', value: 2.1 },
            { month: 'Dec', value: 2.0 }
          ],
          growthPotential: [
            { month: 'Jan', potential: 20 },
            { month: 'Feb', potential: 25 },
            { month: 'Mar', potential: 45 },
            { month: 'Apr', potential: 70 },
            { month: 'May', potential: 85 },
            { month: 'Jun', potential: 75 },
            { month: 'Jul', potential: 65 },
            { month: 'Aug', potential: 70 },
            { month: 'Sep', potential: 80 },
            { month: 'Oct', potential: 85 },
            { month: 'Nov', potential: 60 },
            { month: 'Dec', potential: 30 }
          ]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setWeatherData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return { weatherData, loading, error };
};
