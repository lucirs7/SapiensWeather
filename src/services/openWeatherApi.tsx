import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';

import Ajv from 'ajv';

import {WeatherData} from './weatherApiInterface';
import {MyWeatherInfo} from '../components/MyWeatherInfo';

const OPENWEATHERAPI: string = 'Open Weather API';
const OPENWEATHER_URL: string = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_KEY: string = '35862a50551ab9adbd69336f3ff94a5b';
const KELVIN_TO_CELSIUS: string = '-273,15';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    base: {
      type: 'string',
    },
    clouds: {
      type: 'object',
      properties: {
        all: {
          type: 'integer',
        },
      },
      required: ['all'],
    },
    cod: {
      type: 'integer',
    },
    coord: {
      type: 'object',
      properties: {
        lat: {
          type: 'number',
        },
        lon: {
          type: 'number',
        },
      },
      required: ['lat', 'lon'],
    },
    dt: {
      type: 'integer',
    },
    id: {
      type: 'integer',
    },
    main: {
      type: 'object',
      properties: {
        feels_like: {
          type: 'number',
        },
        grnd_level: {
          type: 'integer',
        },
        humidity: {
          type: 'integer',
        },
        pressure: {
          type: 'integer',
        },
        sea_level: {
          type: 'integer',
        },
        temp: {
          type: 'number',
        },
        temp_max: {
          type: 'number',
        },
        temp_min: {
          type: 'number',
        },
      },
      required: [
        'feels_like',
        'grnd_level',
        'humidity',
        'pressure',
        'sea_level',
        'temp',
        'temp_max',
        'temp_min',
      ],
    },
    name: {
      type: 'string',
    },
    sys: {
      type: 'object',
      properties: {
        country: {
          type: 'string',
        },
        id: {
          type: 'integer',
        },
        sunrise: {
          type: 'integer',
        },
        sunset: {
          type: 'integer',
        },
        type: {
          type: 'integer',
        },
      },
      required: ['country', 'id', 'sunrise', 'sunset', 'type'],
    },
    timezone: {
      type: 'integer',
    },
    visibility: {
      type: 'integer',
    },
    weather: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            description: {
              type: 'string',
            },
            icon: {
              type: 'string',
            },
            id: {
              type: 'integer',
            },
            main: {
              type: 'string',
            },
          },
          required: ['description', 'icon', 'id', 'main'],
        },
      ],
    },
    wind: {
      type: 'object',
      properties: {
        deg: {
          type: 'integer',
        },
        speed: {
          type: 'number',
        },
      },
      required: ['deg', 'speed'],
    },
  },
  required: [
    'base',
    'clouds',
    'cod',
    'coord',
    'dt',
    'id',
    'main',
    'name',
    'sys',
    'timezone',
    'visibility',
    'weather',
    'wind',
  ],
};

const validate = ajv.compile(schema);

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

      const isValid = validate(response.data);
      if (isValid) {
        console.log('API data is OK! :)');
      } else {
        console.log('There is an error in API data: ', validate.errors);
      }

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
