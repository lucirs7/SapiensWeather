/**
 *
 * Component that allows managing internet connection.
 * It sets a variable with internet connection state.
 * It doesn't have a view as it is not needed.
 *
 */
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

interface Props {
  setIsConnected: (isConnected: boolean) => void;
}

export const MyNetConnectionManager: React.FC<Props> = ({setIsConnected}) => {
  useEffect(() => {
    const unsuscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsuscribe();
    };
  }, [setIsConnected]);

  return null;
};
