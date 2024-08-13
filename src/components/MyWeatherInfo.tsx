import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {MyWeatherIcon} from './MyWeatherIconComponent';

const NOT_FOUND_TEMPERATURE: string = '--';
const NOT_FOUND_WEATHER_STATUS: string = "Couldn't load data...";

export const MyWeatherInfo = ({api, weatherData}) => {
  const [isError, setError] = useState(false);

  return (
    <View>
      <MyWeatherIcon api={api} weatherStatus={weatherData.weatherStatus} />
      <View style={styles.weatherInfoContainer}>
        <Text style={styles.weatherTempText}>
          {!isError ? `${weatherData.temperature}` : `${NOT_FOUND_TEMPERATURE}`}
          ºC
        </Text>
        <Text style={styles.weatherStatusText}>
          {!isError ? weatherData.weatherStatus : NOT_FOUND_WEATHER_STATUS}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height / 10,
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
