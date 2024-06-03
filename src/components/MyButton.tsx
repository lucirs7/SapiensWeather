/**
 *
 * Button component. As different buttons are used in project, main button is built.
 *
 */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {myButtonStyles} from '../styles/MyButtonStyles';

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
        style={
          styling ? myButtonStyles.button : myButtonStyles.locationOkButton
        }
        onPress={onPressCall}>
        <Text style={{...myButtonStyles.text, color: '#fafafa'}}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
