import axios from 'axios';
import {WeatherData} from './weatherApiInterface';

const WEATHERAPI_URL = 'http://api.weatherapi.com/v1';
const WEATHERAPI_KEY = '0d0bd1cfdcc3425f96175517240206';

export const fetchWeatherDataWA = async (
  location: string,
): Promise<WeatherData> => {
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
      temperature: response.data.current.temp_c,
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
