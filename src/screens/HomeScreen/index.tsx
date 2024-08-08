/**
 *
 * Main screen. Contains all UI and its corresponding logic.
 *
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Dimensions, StyleSheet} from 'react-native';

//import Snackbar from 'react-native-snackbar';
import {Picker} from '@react-native-picker/picker';

//import {getWeatherData, WeatherData} from '../../services/weatherApiInterface';
//import {MyButton} from '../../components/MyButtonComponent';
import {MyWeatherIcon} from '../../components/MyWeatherIconComponent';
import {MyLocationInput} from '../../components/MyLocationInputComponent';

import {
  NOT_FOUND_TEMPERATURE,
  NOT_FOUND_WEATHER_STATUS,
  OPENWEATHERAPI,
  WEATHERAPI,
} from '../../constants/constants';
import {MyNetConnectionManager} from '../../components/MyNetConnectionComponent';

import {useWeatherService} from '../../useWeatherService';

export default function Home(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [api, setApi] = useState(OPENWEATHERAPI);
  const [location, setLocation] = useState('');
  const whatever = useCallback(() => {}, []);
  const weatherData = useWeatherService(location, api, whatever);

  const [isConnected, setIsConnected] = useState(true);
  const [isError, setIsError] = useState(false);

  const pickerRef = useRef();

  /*const openPicker = () => {
    pickerRef.current.focus();
  }

  const closePicker = () => {
    pickerRef.current.blur();
  }*/

  /**
   * Function that manages Snackbar state,
   * which is used to give feedback to user on error.
   * @param message described error.
   */
  /*const handleErrorMessage = (message: string, show: boolean) => {
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
  };*/

  /**
   * Function that manages feedback according to internet state.
   */
  /*const handleNetConnection = () => {
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
  }, [isConnected]);*/

  /**
   * Function that allows changing API services.
   */
  const changeApi = (selectedApi: string) => {
    /* if (api === WEATHERAPI) {
      setApi(OPENWEATHERAPI);
    } else {
      setApi(WEATHERAPI);
    } */
    setApi(selectedApi);
  };

  const handleChangeLocation = (value: string) => {
    setLocation(value);
  };

  const seeWeatherData = useCallback(location_ => {
    setLocation(location_);
  }, []);

  /*useEffect(() => {
    seeWeatherData();
  }, []);*/

  return (
    <SafeAreaView style={{...homeStyles.container, ...backgroundStyle}}>
      <MyNetConnectionManager setIsConnected={setIsConnected} />
      <ScrollView
        style={homeStyles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View>
          {weatherData?.resolving ? <ActivityIndicator /> : undefined}
          <Picker
            ref={pickerRef}
            selectedValue={api}
            onValueChange={itemValue => {
              changeApi(itemValue);
            }}>
            <Picker.Item label={OPENWEATHERAPI} value={OPENWEATHERAPI} />
            <Picker.Item label={WEATHERAPI} value={WEATHERAPI} />
          </Picker>
          {/*<MyButton styling={true} buttonText={api} onPressCall={changeApi} />*/}
          <Text style={homeStyles.text}>
            Enter a city name and see its weather data
          </Text>
          <View style={homeStyles.locationContainer}>
            <MyLocationInput handleOnLocationAccept={seeWeatherData} />
          </View>
          <MyWeatherIcon
            api={api}
            weatherStatus={weatherData.data?.weatherStatus}
          />
          <View style={homeStyles.weatherInfoContainer}>
            <Text style={homeStyles.weatherTempText}>
              {!isError
                ? `${weatherData.data?.temperature}`
                : `${NOT_FOUND_TEMPERATURE}`}
              ºC
            </Text>
            <Text style={homeStyles.weatherStatusText}>
              {!isError
                ? weatherData.data?.weatherStatus
                : NOT_FOUND_WEATHER_STATUS}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
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
