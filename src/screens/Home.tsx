/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Snackbar from 'react-native-snackbar';

import {
  getWeatherData,
  OPENWEATHERAPI,
  WEATHERAPI,
  WeatherData,
} from '../services/weatherApiInterface';
import {MyButton} from '../components/MyButton';
import {MyWeatherIcon} from '../components/MyWeatherIcon';
import {MyLocationInput} from '../components/MyLocationInput';

const ZERO_TEMP: string = '--.-- ºC';
const NOT_FOUND_WEATHER: string = "Couldn't load data...";

export default function Home(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [api, setApi] = useState(OPENWEATHERAPI);
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState('Weather status');

  const showErrorMessage = (message: string) => {
    Snackbar.show({
      text: message,
      numberOfLines: 10,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'OK',
        textColor: '#fafafa',
      },
    });
  };

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
    const weatherData: WeatherData | Error = await getWeatherData(
      api,
      location,
    );

    if (weatherData !== undefined) {
      setTemperature(weatherData.temperature);
      setWeatherStatus(weatherData.weatherStatus);
      return;
    } else if (weatherData === Error) {
      showErrorMessage('An error occured');
    }
  }, [location, api]);

  useEffect(() => {
    seeWeatherData();
  }, []);

  return (
    <SafeAreaView style={{...styles.container, ...backgroundStyle}}>
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View>
          <MyButton styling={true} buttonText={api} onPressCall={changeApi} />
          <Text style={styles.text}>
            Enter a city name and see its weather data
          </Text>
          <View style={styles.locationContainer}>
            <MyLocationInput
              location={location}
              handleChangeLocation={handleChangeLocation}
              handleOnLocationAccept={seeWeatherData}
            />
          </View>
          <MyWeatherIcon api={api} weatherStatus={weatherStatus} />
          <View style={styles.weatherInfoContainer}>
            <Text style={styles.weatherTempText}>
              {temperature !== undefined
                ? `${temperature.toFixed(2)} ºC`
                : ZERO_TEMP}
            </Text>
            <Text style={styles.weatherStatusText}>
              {weatherStatus !== undefined ? weatherStatus : NOT_FOUND_WEATHER}
            </Text>
          </View>
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
    marginVertical: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    maxHeight: Dimensions.get('window').height / 8,
    maxWidth: Dimensions.get('window').width,
  },
  weatherInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height / 50,
  },
  weatherTempText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 56,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weatherStatusText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
