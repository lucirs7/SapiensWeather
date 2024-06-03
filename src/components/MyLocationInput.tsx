/**
 *
 * Component for location input. Contains location pin icon, text input, and 'submit' button.
 * Modeling these components makes project more clearly built, in case a different way of
 * inputting location is desired to be used.
 *
 */
import React from 'react';
import {Image, TextInput, View} from 'react-native';
import {MyButton} from './MyButton';
import {myLocationInputStyles} from '../styles/MyLocationInputStyles';

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
    <View style={myLocationInputStyles.container}>
      <Image
        style={myLocationInputStyles.locationIcon}
        source={require(iconLocationPinUrl)}
      />
      <TextInput
        style={myLocationInputStyles.locationInput}
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
