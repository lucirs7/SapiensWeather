/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import {LocationContext} from './src/contexts/LocationContext';
import {locations} from './src/components/LocationsList';

const iconLocationPinUrl = './src/assets/images/iconLocationPin.png';
const iconSunUrl = './src/assets/images/iconSun.png';
const iconCloudsUrl = './src/assets/images/iconClouds.png';
const iconRainUrl = './src/assets/images/iconRain.png';
const iconSnowUrl = './src/assets/images/iconSnow.png';
const iconThunderstormUrl = './src/assets/images/iconThunderstorm.png';
const iconMistUrl = './src/assets/images/iconMist.png';
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [api, setApi] = useState(OPENWEATHERAPI);
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState('Weather status');
  const [weatherIcon, setWeatherIcon] = useState(iconNotFoundUrl);

  const changeApi = () => {
    if (api === WEATHERAPI) {
      setApi(OPENWEATHERAPI);
    } else {
      setApi(WEATHERAPI);
    }
  };

  const handleChangeLocation = (value: string) => {
    setLocation(value);
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
  }, []);

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
    <SafeAreaView style={{...styles.container, ...backgroundStyle}}>
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View>
          <TouchableOpacity style={styles.button} onPress={changeApi}>
            <Text style={{...styles.text, color: '#fafafa'}}>{api}</Text>
          </TouchableOpacity>
          <Text style={{...styles.text, marginVertical: 8}}>
            Enter a city name and see its weather data
          </Text>
          <View style={styles.locationContainer}>
            <Image
              style={styles.locationIcon}
              source={require(iconLocationPinUrl)}
            />
            <TextInput
              style={styles.locationInput}
              placeholder="Enter a city"
              value={location}
              onChangeText={value => handleChangeLocation(value)}
            />
            <TouchableOpacity
              style={styles.locationOkButton}
              onPress={seeWeatherData}>
              <Text style={{...styles.text, color: '#fafafa'}}>Ok</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weatherInfoContainer}>
            <Text style={styles.weatherTempText}>
              {temperature.toFixed(2)} ºC
            </Text>
            <Text style={styles.weatherStatusText}>{weatherStatus}</Text>
          </View>
          <Image style={styles.weatherIcon} source={weatherIcon} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height / 15,
    backgroundColor: '#aaaaaa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height / 16,
    maxWidth: Dimensions.get('window').width / 2,
    borderRadius: 32,
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    maxHeight: Dimensions.get('window').height / 8,
    maxWidth: Dimensions.get('window').width,
  },
  locationIcon: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 20,
    maxWidth: Dimensions.get('window').width / 5,
    marginHorizontal: 8,
  },
  locationInput: {
    flex: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: '#e1e1e1',
    borderBottomWidth: 2,
    maxHeight: Dimensions.get('window').height / 8,
    maxWidth: Dimensions.get('window').width,
    padding: 8,
  },
  locationOkButton: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginStart: 12,
    backgroundColor: '#aaaaaa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height / 2,
    maxWidth: Dimensions.get('window').width / 6,
    borderRadius: 24,
  },
  weatherInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height / 16,
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
    flex: 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 4,
    maxWidth: Dimensions.get('window').width / 2,
    marginVertical: Dimensions.get('window').height / 42,
  },
});

export default App;
