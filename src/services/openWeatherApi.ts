import axios from 'axios';
import {WeatherData} from './weatherApiInterface';

const OPENWEATHER_URL: string = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_KEY: string = '35862a50551ab9adbd69336f3ff94a5b';

export const fetchWeatherDataOWA = async (
  location: string,
): Promise<WeatherData> => {
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
    const data: WeatherData = {
      weatherStatus: response.data.weather.at(0).main,
      temperature: response.data.main.temp,
    };

    return data;
  } catch (error) {
    console.error(
      'openWeatherApi.ts/fetchWeatherData() - Error on asking for weather data: ',
      error,
    );
    throw new Error('Error fecthing weather data from OpenWeather API');
  }
};
