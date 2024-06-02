/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyButtonProps {
  styling: boolean;
  buttonText: string;
  onPressCall: () => void;
}

export const MyButton: React.FC<MyButtonProps> = ({
  styling,
  buttonText,
  onPressCall,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styling ? styles.button : styles.locationOkButton}
        onPress={onPressCall}>
        <Text style={{...styles.text, color: '#fafafa'}}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height / 15,
    backgroundColor: '#aaaaaa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height / 16,
    maxWidth: Dimensions.get('window').width / 2,
    borderRadius: 32,
  },
  locationOkButton: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginStart: 12,
    backgroundColor: '#aaaaaa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height / 2,
    maxWidth: Dimensions.get('window').width / 6,
    borderRadius: 24,
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
