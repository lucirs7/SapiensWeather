import React from 'react';
import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import {MyButton} from './MyButton';

const iconLocationPinUrl = '../assets/images/iconLocationPin.png';

interface MyLocationInputProps {
  location: string;
  handleChangeLocation: (location: string) => void;
  handleOnLocationAccept: () => void;
}

export const MyLocationInput: React.FC<MyLocationInputProps> = ({
  location,
  handleChangeLocation,
  handleOnLocationAccept,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.locationIcon} source={require(iconLocationPinUrl)} />
      <TextInput
        style={styles.locationInput}
        placeholder="Enter a city"
        value={location}
        onChangeText={value => handleChangeLocation(value)}
      />
      <MyButton
        styling={false}
        buttonText="Ok"
        onPressCall={handleOnLocationAccept}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  locationIcon: {
    flex: 2,
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: Dimensions.get('window').height / 20,
    maxWidth: Dimensions.get('window').width / 3,
    marginHorizontal: 1,
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
});
