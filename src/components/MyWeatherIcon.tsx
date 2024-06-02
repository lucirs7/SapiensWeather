import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {OPENWEATHERAPI} from '../services/weatherApiInterface';

/*const iconOWASunUrl = 'src/assets/images/iconOWASun.png';
const iconOWACloudsUrl = './assets/images/iconOWAClouds.png';
const iconOWARainUrl = './assets/images/iconOWARain.png';
const iconOWASnowUrl = './assets/images/iconOWASnow.png';
const iconOWAThunderstormUrl = './assets/images/iconOWAThunderstorm.png';
const iconOWAMistUrl = './assets/images/iconOWAMist.png';*/

const iconWASunUrl = './src/assets/images/iconSunWA.png';
const iconWACloudsUrl = './src/assets/images/iconWAClouds.png';
const iconWARainUrl = './src/assets/images/iconWARain.png';
const iconWASnowUrl = './src/assets/images/iconWASnow.png';
const iconWAThunderstormUrl = './src/assets/images/iconWAThunderstorm.png';
const iconWAMistUrl = './src/assets/images/iconWAMist.png';

const iconNotFoundUrl = './src/assets/images/iconNotFound.png';

const CLEAR = 'Clear';
const SUNNY = 'Sunny';
const CLOUDS = 'Clouds';
const PARTLY_CLOUDY = 'Partly cloudy';
const CLOUDY = 'Cloudy';
const RAIN = 'Rain';
const LIGHT_RAIN = 'Light rain';
const HEAVY_RAIN = 'Heavy rain';
const THUNDERSTORM = 'Thunderstorm';
const SNOW = 'Snow';
const MIST = 'Mist';

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
      /*switch (weatherStatus) {
        case CLEAR:
        case SUNNY:
          setWeatherIcon(require(iconOWASunUrl));
          break;
        case CLOUDS:
        case CLOUDY:
        case PARTLY_CLOUDY:
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
          setWeatherIcon(require(iconOWAMistUrl));
          break;
        default:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
      }*/
    } else {
      switch (weatherStatus) {
        case CLEAR:
        case SUNNY:
          setWeatherIcon(require(iconWASunUrl));
          break;
        case CLOUDS:
        case CLOUDY:
        case PARTLY_CLOUDY:
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
          setWeatherIcon(require(iconWAMistUrl));
          break;
        default:
          setWeatherIcon(require(iconNotFoundUrl));
          break;
      }
    }
  };

  useEffect(() => {
    changeWeatherIcon();
  }, [weatherIcon]);

  return (
    <View>
      <Image style={styles.weatherIcon} source={weatherIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherIcon: {
    flex: 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 4,
    maxWidth: Dimensions.get('window').width / 2,
    marginTop: Dimensions.get('window').height / 12,
  },
});
