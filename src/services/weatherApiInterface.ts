import {fetchWeatherDataOWA} from './openWeatherApi';
import {fetchWeatherDataWA} from './weatherApi';

export const OPENWEATHERAPI: string = 'Open Weather API';
export const WEATHERAPI: string = 'Weather API';

export interface WeatherData {
  weatherStatus: string;
  temperature: number;
}

export const getWeatherData = async (
  api: string,
  location: string,
): Promise<WeatherData | Error> => {
  let weatherData: WeatherData | Error;

  switch (api) {
    case OPENWEATHERAPI:
      weatherData = await fetchWeatherDataOWA(location);
      break;
    case WEATHERAPI:
      weatherData = await fetchWeatherDataWA(location);
      break;
    default:
      weatherData = new Error('Unsupported API.');
      break;
  }

  return weatherData;
};
