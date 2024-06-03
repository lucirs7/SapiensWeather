/**
 *
 * File that handles OpenWeatherAPI functionality.
 *
 */
import axios from 'axios';
import {WeatherData} from './weatherApiInterface';
import {
  KELVIN_TO_CELSIUS,
  OPENWEATHER_KEY,
  OPENWEATHER_URL,
} from '../constants/constants';

export const fetchWeatherDataOWA = async (
  location: string,
): Promise<WeatherData | Error> => {
  try {
    const response = await axios.get(`${OPENWEATHER_URL}/weather`, {
      params: {
        q: location,
        appid: OPENWEATHER_KEY,
      },
    });

    console.log(
      'openWeatherApi.ts/fetchWeatherDataOWA() - Asking for temp in ',
      location,
      ': ',
      response.data,
    );

    let temperatureValue = response.data.main.temp;
    temperatureValue = temperatureValue + parseFloat(KELVIN_TO_CELSIUS);

    const data: WeatherData = {
      weatherStatus: response.data.weather.at(0).main,
      temperature: Number(temperatureValue).toFixed(2),
    };

    return data;
  } catch (error) {
    console.log(
      'openWeatherApi.ts/fetchWeatherData() - Error on asking for weather data: ',
      error,
    );
    return new Error('Error fecthing weather data from server');
  }
};
