import React, {useEffect, useState} from 'react';
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
import {fetchWeatherData, WeatherData} from './src/services/openWeatherApi';

const locationPinUrl = './src/assets/images/locationPin.png';
const iconSunUrl = './src/assets/images/iconSun.png';
const iconCloudsUrl = './src/assets/images/iconClouds.png';
const iconRainUrl = './src/assets/images/iconRain.png';
const iconSnowUrl = './src/assets/images/iconSnow.png';
const iconThunderstormUrl = './src/assets/images/iconThunderstorm.png';
const iconMistUrl = './src/assets/images/iconMist.png';
const iconNotFoundUrl = './src/assets/images/iconNotFound.png';

const KELVIN_TO_CELSIUS: string = '-273,15';

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

  const [location, setLocation] = useState('Madrid');
  const [temperature, setTemperature] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState('Sunny');
  const [weatherIcon, setWeatherIcon] = useState(iconNotFoundUrl);

  const chooseLocation = (city: string) => {
    setLocation(city);
    seeWeatherData();
  };

  const seeWeatherData = async () => {
    const weatherData: WeatherData = await fetchWeatherData(location);

    if (weatherData !== undefined) {
      let tempValue = weatherData?.temperature;
      tempValue = tempValue + parseFloat(KELVIN_TO_CELSIUS);

      console.log(
        'app.tsx/seeWeatherData() - Weather in',
        location,
        ' is: ',
        weatherData.weatherStatus,
        'and temp=',
        weatherData.temperature,
        ' k=',
        parseFloat(KELVIN_TO_CELSIUS),
      );
      setTemperature(tempValue);
      setWeatherStatus(weatherData.weatherStatus);
      changeWeatherIcon();
    }
  };

  useEffect(() => {
    seeWeatherData();
  }, [location]);

  const changeWeatherIcon = () => {
    switch (weatherStatus) {
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
        <TouchableOpacity
          style={styles.locationButton}
          onPress={seeWeatherData}>
          <Image style={styles.locationIcon} source={require(locationPinUrl)} />
          <Text style={styles.locationText}>Choose location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => chooseLocation('Madrid')}>
          <Image style={styles.locationIcon} source={require(locationPinUrl)} />
          <Text style={styles.locationText}>Madrid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => chooseLocation('London')}>
          <Image style={styles.locationIcon} source={require(locationPinUrl)} />
          <Text style={styles.locationText}>London</Text>
        </TouchableOpacity>
        <View style={styles.weatherInfoContainer}>
          <Text style={styles.weatherTempText}>
            {temperature.toFixed(2)} ºC
          </Text>
          <Text style={styles.weatherStatusText}>{weatherStatus}</Text>
        </View>
        {/*<Image style={styles.weatherIcon} source={require(iconSunUrl)} />*/}
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
