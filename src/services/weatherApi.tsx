import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';

import Ajv from 'ajv';

import {WeatherData} from './weatherApiInterface';
import {MyWeatherInfo} from '../components/MyWeatherInfo';

const WEATHERAPI: string = 'Weather API';
const WEATHERAPI_URL: string = 'http://api.weatherapi.com/v1';
const WEATHERAPI_KEY: string = '0d0bd1cfdcc3425f96175517240206';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    current: {
      type: 'string',
      properties: {
        cloud: {
          type: 'integer',
        },
        condition: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
            },
            icon: {
              type: 'string',
            },
            text: {
              type: 'string',
            },
          },
          required: ['code', 'icon', 'text'],
        },
        dewpoint_c: {
          type: 'number',
        },
        dewpoint_f: {
          type: 'number',
        },
        feelslike_c: {
          type: 'number',
        },
        feelslike_f: {
          type: 'number',
        },
        gust_kph: {
          type: 'number',
        },
        gust_mph: {
          type: 'number',
        },
        heatindex_c: {
          type: 'number',
        },
        heatindex_f: {
          type: 'number',
        },
        humidity: {
          type: 'integer',
        },
        is_day: {
          type: 'integer',
        },
        last_updated: {
          type: 'string',
        },
        last_updated_epoch: {
          type: 'integer',
        },
        precip_in: {
          type: 'integer',
        },
        precip_mm: {
          type: 'integer',
        },
        pressure_in: {
          type: 'number',
        },
        pressure_mb: {
          type: 'integer',
        },
        temp_c: {
          type: 'number',
        },
        temp_f: {
          type: 'number',
        },
        uv: {
          type: 'integer',
        },
        vis_km: {
          type: 'integer',
        },
        vis_miles: {
          type: 'integer',
        },
        wind_degree: {
          type: 'integer',
        },
        wind_dir: {
          type: 'string',
        },
        wind_kph: {
          type: 'number',
        },
        wind_mph: {
          type: 'number',
        },
        windchill_c: {
          type: 'number',
        },
        windchill_f: {
          type: 'number',
        },
      },
      required: [
        'cloud',
        'condition',
        'dewpoint_c',
        'dewpoint_f',
        'feelslike_c',
        'feelslike_f',
        'gust_kph',
        'gust_mph',
        'heatindex_c',
        'heatindex_f',
        'humidity',
        'is_day',
        'last_updated',
        'last_updated_epoch',
        'precip_in',
        'precip_mm',
        'pressure_in',
        'pressure_mb',
        'temp_c',
        'temp_f',
        'uv',
        'vis_km',
        'vis_miles',
        'wind_degree',
        'wind_dir',
        'wind_kph',
        'wind_mph',
        'windchill_c',
        'windchill_f',
      ],
    },
    location: {
      type: 'object',
      properties: {
        country: {
          type: 'string',
        },
        lat: {
          type: 'number',
        },
        localtime: {
          type: 'string',
        },
        localtime_epoch: {
          type: 'integer',
        },
        lon: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        region: {
          type: 'string',
        },
        tz_id: {
          type: 'string',
        },
      },
      required: [
        'country',
        'lat',
        'localtime',
        'localtime_epoch',
        'lon',
        'name',
        'region',
        'tz_id',
      ],
    },
  },
  required: ['current', 'location'],
};

const validate = ajv.compile(schema);

const WeatherApi = ({location}) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: '0',
    weatherStatus: 'Weather status',
  });

  const fetchWeatherData = async (): Promise<WeatherData> => {
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

      const isValid = validate(response.data);
      if (isValid) {
        console.log('API data response is valid!');
      } else {
        console.log(validate.errors);
      }
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
      throw new Error('Error fecthing weather data from server');
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
      <MyWeatherInfo api={WEATHERAPI} weatherData={weatherData} />
    </View>
  );
};

export default WeatherApi;
