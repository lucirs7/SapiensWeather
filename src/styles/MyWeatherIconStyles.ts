import {Dimensions, StyleSheet} from 'react-native';

export const myWeatherIconStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  weatherIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 4,
    maxWidth: Dimensions.get('window').width / 2,
    marginTop: Dimensions.get('window').height / 12,
  },
});
