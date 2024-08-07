/**
 *
 * Component for weather icon. Helps keep code clearer.
 * Handles image change according to selected API and weather conditions.
 *
 */
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {OPENWEATHERAPI, NOT_FOUND_WEATHER_STATUS} from '../../constants/constants';
import {myWeatherIconStyles} from './styles';

const iconOWASunUrl = '../../assets/images/iconOWASun.png';
const iconOWACloudsUrl = '../../assets/images/iconOWAClouds.png';
const iconOWARainUrl = '../../assets/images/iconOWARain.png';
const iconOWASnowUrl = '../../assets/images/iconOWASnow.png';
const iconOWAThunderstormUrl = '../../assets/images/iconOWAThunderstorm.png';
const iconOWAMistUrl = '../../assets/images/iconOWAMist.png';

const iconWASunUrl = '../../assets/images/iconWASun.png';
const iconWACloudsUrl = '../../assets/images/iconWAClouds.png';
const iconWARainUrl = '../../assets/images/iconWARain.png';
const iconWASnowUrl = '../../assets/images/iconWASnow.png';
const iconWAThunderstormUrl = '../../assets/images/iconWAThunderstorm.png';
const iconWAMistUrl = '../../assets/images/iconWAMist.png';

const iconNotFoundUrl = '../../assets/images/iconNotFound.png';

const CLEAR = 'Clear';
const SUNNY = 'Sunny';
const CLOUDS = 'Clouds';
const PARTLY_CLOUDY = 'Partly cloudy';
const OVERCAST = 'Overcast';
const CLOUDY = 'Cloudy';
const RAIN = 'Rain';
const LIGHT_RAIN = 'Light rain';
const HEAVY_RAIN = 'Heavy rain';
const THUNDERSTORM = 'Thunderstorm';
const SNOW = 'Snow';
const MIST = 'Mist';
const FOG = 'Fog';

interface MyWeatherIconProps {
  api: string;
  weatherStatus: string;
}

export const MyWeatherIcon: React.FC<MyWeatherIconProps> = ({
  api,
  weatherStatus,
}) => {
  const [weatherIcon, setWeatherIcon] = useState(iconNotFoundUrl);

  const changeWeatherIcon = () => {
    if (api === OPENWEATHERAPI) {
      switch (weatherStatus) {
        case CLEAR:
        case SUNNY:
          setWeatherIcon(require(iconOWASunUrl));
          break;
        case CLOUDS:
        case CLOUDY:
        case PARTLY_CLOUDY:
        case OVERCAST:
          setWeatherIcon(require(iconOWACloudsUrl));
          break;
        case RAIN:
        case LIGHT_RAIN:
        case HEAVY_RAIN:
          setWeatherIcon(require(iconOWARainUrl));
          break;
        case SNOW:
          setWeatherIcon(require(iconOWASnowUrl));
          break;
        case THUNDERSTORM:
          setWeatherIcon(require(iconOWAThunderstormUrl));
          break;
        case MIST:
        case FOG:
          setWeatherIcon(require(iconOWAMistUrl));
          break;
        case NOT_FOUND_WEATHER_STATUS:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
        default:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
      }
    } else {
      switch (weatherStatus) {
        case CLEAR:
        case SUNNY:
          setWeatherIcon(require(iconWASunUrl));
          break;
        case CLOUDS:
        case CLOUDY:
        case PARTLY_CLOUDY:
        case OVERCAST:
          setWeatherIcon(require(iconWACloudsUrl));
          break;
        case RAIN:
        case LIGHT_RAIN:
        case HEAVY_RAIN:
          setWeatherIcon(require(iconWARainUrl));
          break;
        case SNOW:
          setWeatherIcon(require(iconWASnowUrl));
          break;
        case THUNDERSTORM:
          setWeatherIcon(require(iconWAThunderstormUrl));
          break;
        case MIST:
        case FOG:
          setWeatherIcon(require(iconWAMistUrl));
          break;
        case NOT_FOUND_WEATHER_STATUS:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
        default:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
      }
    }
  };

  useEffect(() => {
    changeWeatherIcon();
  }, [api, weatherStatus]);

  return (
    <View style={myWeatherIconStyles.container}>
      <Image style={myWeatherIconStyles.weatherIcon} source={weatherIcon} />
    </View>
  );
};
