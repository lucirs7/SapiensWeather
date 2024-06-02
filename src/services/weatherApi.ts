import axios from 'axios';
import {WeatherData} from './weatherApiInterface';

const WEATHERAPI_URL: string = 'http://api.weatherapi.com/v1';
const WEATHERAPI_KEY: string = '0d0bd1cfdcc3425f96175517240206';

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
      temperature: response.data.current.temp_c,
    };

    return data;
  } catch (error) {
    console.log(
      'weatherApi.ts/fetchWeatherDataWA() - Error fetching weather data:',
      error,
    );
    return new Error('Error fecthing weather data from Weather API');
  }
};
