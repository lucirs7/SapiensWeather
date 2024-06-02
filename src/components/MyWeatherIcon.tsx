/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const iconSunOWAUrl = './src/assets/images/iconSunOWA.png';
const iconCloudsOWAUrl = './src/assets/images/iconCloudsOWA.png';
const iconRainOWAUrl = './src/assets/images/iconRain.pngOWA';
const iconSnowOWAUrl = './src/assets/images/iconSnowOWA.png';
const iconThunderstormOWAUrl = './src/assets/images/iconThunderstormOWA.png';
const iconMistOWAUrl = './src/assets/images/iconMistOWA.png';
const iconNotFoundUrl = './src/assets/images/iconNotFound.png';
const iconSunWAUrl = './src/assets/images/iconSunWA.png';
const iconCloudsWAUrl = './src/assets/images/iconCloudsWA.png';
const iconRainWAUrl = './src/assets/images/iconRainWA.png';
const iconSnowWAUrl = './src/assets/images/iconSnowWA.png';
const iconThunderstormWAUrl = './src/assets/images/iconThunderstormWA.png';
const iconMistWAUrl = './src/assets/images/iconMistWA.png';

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

  const changeWeatherIcon = (weatherStat: string) => {
    switch (weatherStat) {
      case CLEAR:
      case SUNNY:
        setWeatherIcon(require(iconSunUrl));
        break;
      case CLOUDS:
      case CLOUDY:
      case PARTLY_CLOUDY:
        setWeatherIcon(require(iconCloudsUrl));
        break;
      case RAIN:
      case LIGHT_RAIN:
      case HEAVY_RAIN:
        setWeatherIcon(require(iconRainUrl));
        break;
      case SNOW:
        setWeatherIcon(require(iconSnowUrl));
        break;
      case THUNDERSTORM:
        setWeatherIcon(require(iconThunderstormUrl));
        break;
      case MIST:
        setWeatherIcon(require(iconMistUrl));
        break;
      default:
        setWeatherIcon(require(iconNotFoundUrl));
        break;
    }
  };

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
    marginVertical: Dimensions.get('window').height / 42,
  },
});
