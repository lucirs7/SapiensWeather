import {Dimensions, StyleSheet} from 'react-native';

export const myButtonStyles = StyleSheet.create({
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
