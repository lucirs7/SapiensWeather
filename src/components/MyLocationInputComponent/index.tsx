/**
 *
 * Component for location input. Contains location pin icon, text input, and 'submit' button.
 * Modeling these components makes project more clearly built, in case a different way of
 * inputting location is desired to be used.
 *
 */
import React from 'react';
import {Image, TextInput, View} from 'react-native';
import {MyButton} from '../MyButtonComponent';
import {myLocationInputStyles} from './styles';
import {useState} from 'react';

const iconLocationPinUrl = '../../assets/images/iconLocationPin.png';

interface MyLocationInputProps {
  handleOnLocationAccept: (location_: string) => void;
}

export const MyLocationInput: React.FC<MyLocationInputProps> = ({
  handleOnLocationAccept,
}) => {
  const [location, setLocation] = useState('');

  const onOkPress = () => {
    handleOnLocationAccept(location);
  };

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
        onChangeText={setLocation}
      />
      <MyButton styling={false} buttonText="Ok" onPressCall={onOkPress} />
    </View>
  );
};
