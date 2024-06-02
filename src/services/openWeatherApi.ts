/**
 *
 * File that handles OpenWeatherAPI functionality.
 *
 */
import axios from 'axios';
import {WeatherData} from './weatherApiInterface';

const OPENWEATHER_URL: string = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_KEY: string = '35862a50551ab9adbd69336f3ff94a5b';

const KELVIN_TO_CELSIUS: string = '-273,15';

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
      temperature: temperatureValue,
    };

    return data;
  } catch (error) {
    console.log(
      'openWeatherApi.ts/fetchWeatherData() - Error on asking for weather data: ',
      error,
    );
    return new Error('Error fecthing weather data from OpenWeather API');
  }
};
