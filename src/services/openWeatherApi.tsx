import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';

import {WeatherData} from './weatherApiInterface';
import {MyWeatherInfo} from '../components/MyWeatherInfo';

const OPENWEATHERAPI: string = 'Open Weather API';
const OPENWEATHER_URL: string = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_KEY: string = '35862a50551ab9adbd69336f3ff94a5b';
const KELVIN_TO_CELSIUS: string = '-273,15';

const OpenWeatherApi = ({location}) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: '0',
    weatherStatus: 'Weather status',
  });

  const fetchWeatherData = async (): Promise<WeatherData> => {
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
      throw new Error('Error fetching weather data from server');
    }
  };

  useEffect(() => {
    fetchWeatherData()
      .then(data => {
        setWeatherData(data);
      })
      .catch();
  }, [location]);

  return (
    <View>
      <Text>{`${location}`}</Text>
      <MyWeatherInfo api={OPENWEATHERAPI} weatherData={weatherData} />
    </View>
  );
};

export default OpenWeatherApi;
