/**
 *
 * File that handles WeatherAPI functionality.
 *
 */
import axios from 'axios';
import {WeatherData} from './weatherApiInterface';
import {WEATHERAPI_KEY, WEATHERAPI_URL} from '../constants/constants';

export const fetchWeatherDataWA = async (
  location: string,
): Promise<WeatherData | Error> => {
  try {
    const response = await axios.get(`${WEATHERAPI_URL}/current.json`, {
      params: {
        key: WEATHERAPI_KEY,
        q: location,
      },
    });

    console.log(
      'weatherApi.ts/fetchWeatherDataWA() - Asking for temp in ',
      location,
      ': ',
      response.data,
      ' STATUS=',
      response.data.current.condition.text,
      ' TEMP=',
      response.data.current.temp_c,
    );
    const data: WeatherData = {
      weatherStatus: response.data.current.condition.text,
      temperature: Number(response.data.current.temp_c).toFixed(2),
    };

    return data;
  } catch (error) {
    console.log(
      'weatherApi.ts/fetchWeatherDataWA() - Error fetching weather data:',
      error,
    );
    return new Error('Error fecthing weather data from server');
  }
};
