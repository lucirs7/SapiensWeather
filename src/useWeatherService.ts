import {useEffect, useState} from 'react';
import {getWeatherData, WeatherData} from './services/weatherApiInterface';

type t = {
  data?: WeatherData;
  error?: Error;
  resolving?: boolean;
  resolved?: boolean;
};

export const useWeatherService = (location: string, api: string) => {
  const [weatherData, setWeatherData] = useState<t>({
    data: {
      temperature: '0',
      weatherStatus: 'weather status',
    },
  });

  useEffect(() => {
    setWeatherData({resolving: true});

    getWeatherData(api, location)
      .then((weatherData_: WeatherData | Error) => {
        setWeatherData({data: weatherData_, resolved: true});
      })
      .catch(() => {
        setWeatherData({error: new Error('abc'), resolved: true});
      });
  }, [location, api]);

  return weatherData;
};

/**
 * Main logic function. Makes API call and sets data with results from call.
 */
/*const seeWeatherData = useCallback(async (location) => {
    const weatherData_: WeatherData | Error = await getWeatherData(
      api,
      location,
    );

    if (weatherData_ !== undefined && !(weatherData_ instanceof Error)) {
      setWeatherData({
        temperature: weatherData_.temperature,
        weatherStatus: weatherData_.weatherStatus,
      });

      setIsError(false);
      handleErrorMessage('', false);

      return;
    } else if (weatherData_ instanceof Error && location.length > 0) {
      setIsError(true);

      setWeatherData({
        temperature: NOT_FOUND_TEMPERATURE,
        weatherStatus: NOT_FOUND_WEATHER_STATUS,
      });

      if (isConnected) {
        handleErrorMessage(
          String(weatherData_ + '. Check the city you typed.'),
          true,
        );
      } else {
        handleErrorMessage('Check your internet connection.', true);
      }
    }
  }, [api]);*/
