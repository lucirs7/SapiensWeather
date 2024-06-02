import axios from 'axios';
import {WeatherData} from './weatherApiInterface';

const WEATHERAPI_URL = 'http://api.weatherapi.com/v1';
const WEATHERAPI_KEY = '0d0bd1cfdcc3425f96175517240206';

export const fetchWeatherDataWA = async (location: string) => {
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
    );
    const data: WeatherData = {
      weatherStatus: response.data.weather.at(0).main,
      temperature: response.data.main.temp,
    };

    return data;
  } catch (error) {
    console.error(
      'weatherApi.ts/fetchWeatherDataWA() - Error fetching weather data:',
      error,
    );
    throw new Error('Error fecthing weather data from Weather API');
  }
};
