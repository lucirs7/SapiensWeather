import {Dimensions, StyleSheet} from 'react-native';

export const myLocationInputStyles = StyleSheet.create({
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
