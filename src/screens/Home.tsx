/**
 *
 * Main screen. Contains all UI and its corresponding logic.
 *
 */
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
import NetInfo from '@react-native-community/netinfo';

import {
  getWeatherData,
  OPENWEATHERAPI,
  WEATHERAPI,
  WeatherData,
} from '../services/weatherApiInterface';
import {MyButton} from '../components/MyButton';
import {MyWeatherIcon} from '../components/MyWeatherIcon';
import {MyLocationInput} from '../components/MyLocationInput';

const NOT_FOUND_TEMPERATURE: string = '--';
export const NOT_FOUND_WEATHER_STATUS: string = "Couldn't load data...";

export default function Home(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [api, setApi] = useState(OPENWEATHERAPI);

  const [location, setLocation] = useState('');

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: '0',
    weatherStatus: 'Weather status',
  });

  const [isConnected, setIsConnected] = useState(true);
  const [isError, setIsError] = useState(false);

  /**
   * Function that manages Snackbar state,
   * which is used to give feedback to user on error.
   * @param message described error.
   */
  const handleErrorMessage = (message: string, show: boolean) => {
    if (show) {
      Snackbar.show({
        text: message,
        numberOfLines: 10,
        duration: 7500,
        backgroundColor: '#fe8484',
        textColor: '#8b0000',
      });
    } else {
      Snackbar.dismiss();
    }
  };

  useEffect(() => {
    const unsuscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

  const handleNetConnection = () => {
    if (isConnected === false) {
      handleErrorMessage('Check your internet connection.', true);
      setWeatherData({
        temperature: NOT_FOUND_TEMPERATURE,
        weatherStatus: NOT_FOUND_WEATHER_STATUS,
      });
    }
  };

  useEffect(() => {
    handleNetConnection();
  }, [isConnected]);

  /**
   * Function that allows changing API services.
   */
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

  /**
   * Main logic function. Makes API call and sets data with results from call.
   */
  const seeWeatherData = useCallback(async () => {
    const weatherData_: WeatherData | Error = await getWeatherData(
      api,
      location,
    );

    if (weatherData_ !== undefined && !(weatherData_ instanceof Error)) {
      setWeatherData({
        temperature: weatherData_.temperature,
        weatherStatus: weatherData_.weatherStatus,
      });

      setIsError(false);
      handleErrorMessage('', false);

      return;
    } else if (weatherData_ instanceof Error && location.length > 0) {
      setIsError(true);

      setWeatherData({
        temperature: NOT_FOUND_TEMPERATURE,
        weatherStatus: NOT_FOUND_WEATHER_STATUS,
      });

      if (isConnected) {
        handleErrorMessage(
          String(weatherData_ + '. Check the city you typed.'),
          true,
        );
      } else {
        handleErrorMessage('Check your internet connection.', true);
      }
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
          <MyWeatherIcon api={api} weatherStatus={weatherData.weatherStatus} />
          <View style={styles.weatherInfoContainer}>
            <Text style={styles.weatherTempText}>
              {!isError
                ? `${weatherData.temperature}`
                : `${NOT_FOUND_TEMPERATURE}`}
              ºC
            </Text>
            <Text style={styles.weatherStatusText}>
              {!isError ? weatherData.weatherStatus : NOT_FOUND_WEATHER_STATUS}
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
