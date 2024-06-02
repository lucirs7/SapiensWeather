/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  getWeatherData,
  OPENWEATHERAPI,
  WEATHERAPI,
  WeatherData,
} from './src/services/weatherApiInterface';

const iconLocationPinUrl = './src/assets/images/iconLocationPin.png';
const iconSunUrl = './src/assets/images/iconSun.png';
const iconCloudsUrl = './src/assets/images/iconClouds.png';
const iconRainUrl = './src/assets/images/iconRain.png';
const iconSnowUrl = './src/assets/images/iconSnow.png';
const iconThunderstormUrl = './src/assets/images/iconThunderstorm.png';
const iconMistUrl = './src/assets/images/iconMist.png';
const iconNotFoundUrl = './src/assets/images/iconNotFound.png';

const CLEAR = 'Clear';
const CLOUDS = 'Clouds';
const RAIN = 'Rain';
const THUNDERSTORM = 'Thunderstorm';
const SNOW = 'Snow';
const MIST = 'Mist';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [api, setApi] = useState(WEATHERAPI);
  const [location, setLocation] = useState('Madrid');
  const [temperature, setTemperature] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState('Sunny');
  const [weatherIcon, setWeatherIcon] = useState(iconNotFoundUrl);

  const changeApi = () => {
    if (api === WEATHERAPI) {
      setApi(OPENWEATHERAPI);
    } else {
      setApi(WEATHERAPI);
    }
  };

  const chooseLocation = (city: string) => {
    setLocation(city);
    seeWeatherData();
  };

  const seeWeatherData = useCallback(async () => {
    const weatherData: WeatherData = await getWeatherData(api, location);

    if (weatherData !== undefined) {
      setTemperature(weatherData.temperature);
      setWeatherStatus(weatherData.weatherStatus);
      changeWeatherIcon(weatherData.weatherStatus);
    }
  }, [location]);

  useEffect(() => {
    seeWeatherData();
  }, [location, seeWeatherData]);

  const changeWeatherIcon = (weatherStat: string) => {
    switch (weatherStat) {
      case CLEAR:
        setWeatherIcon(require(iconSunUrl));
        break;
      case CLOUDS:
        setWeatherIcon(require(iconCloudsUrl));
        break;
      case RAIN:
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
    <SafeAreaView style={{...styles.container, ...backgroundStyle}}>
      <View>
        <TouchableOpacity style={styles.locationButton} onPress={changeApi}>
          <Image
            style={styles.locationIcon}
            source={require(iconLocationPinUrl)}
          />
          <Text style={styles.locationText}>{api}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => chooseLocation('Munich')}>
          <Image
            style={styles.locationIcon}
            source={require(iconLocationPinUrl)}
          />
          <Text style={styles.locationText}>Munich</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => chooseLocation('Punta Cana')}>
          <Image
            style={styles.locationIcon}
            source={require(iconLocationPinUrl)}
          />
          <Text style={styles.locationText}>Punta Cana</Text>
        </TouchableOpacity>
        <View style={styles.weatherInfoContainer}>
          <Text style={styles.weatherTempText}>
            {temperature.toFixed(2)} ºC
          </Text>
          <Text style={styles.weatherStatusText}>{weatherStatus}</Text>
        </View>
        <Image style={styles.weatherIcon} source={weatherIcon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height / 10,
    backgroundColor: '#e1e1e1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height / 12,
    maxWidth: Dimensions.get('window').height / 3,
    borderRadius: 32,
  },
  locationIcon: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 20,
    maxWidth: Dimensions.get('window').width / 5,
  },
  locationText: {
    flex: 3,
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weatherInfoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTempText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weatherStatusText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weatherIcon: {
    flex: 2,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 4,
    maxWidth: Dimensions.get('window').width / 2,
    marginBottom: Dimensions.get('window').height / 4,
  },
});

export default App;
