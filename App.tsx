import React, {useState} from 'react';
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

const locationPinUrl = './src/assets/images/locationPin.png';
const locationPin2Url = './src/assets/images/locationPin2.png';
const iconSunUrl = './src/assets/images/iconSun.png';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [temp, setTemp] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState('Sunny');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const chooseLocation = () => {};

  return (
    <SafeAreaView style={{...styles.container, ...backgroundStyle}}>
      <View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={chooseLocation}>
          <Image
            style={styles.locationIcon}
            source={require(locationPin2Url)}
          />
          <Text style={styles.locationText}>Choose location</Text>
        </TouchableOpacity>
        <View style={styles.weatherInfoContainer}>
          <Text style={styles.weatherTempText}>{temp} ºC</Text>
          <Text style={styles.weatherStatusText}>{weatherStatus}</Text>
        </View>
        <Image style={styles.weatherIcon} source={require(iconSunUrl)} />
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
