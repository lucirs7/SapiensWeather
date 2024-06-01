import axios from 'axios';

const OPENWEATHER_KEY: string = '35862a50551ab9adbd69336f3ff94a5b';

export interface WeatherData {
  weatherStatus: string;
  temperature: number;
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}`,
    );

    console.log('Asking for temp in ', city, ': ', response.data);
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
