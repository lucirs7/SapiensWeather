import axios from 'axios';

const GEONAMES_USERNAME = 'aicul78';

export interface Location {
  id: number;
  name: string;
  countryName: string;
}

export const fetchLocations = async (
  searchQuery: string,
): Promise<Location[]> => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?name_startsWith=${searchQuery}&maxRows=10&username=${GEONAMES_USERNAME}`,
    );

    console.log('Asking for locations: ', response.data.geonames.at(0).lat);
    return response.data.geonames;
  } catch (error) {
    console.error(
      'locationApi.ts/fetchLocations() - Error on asking for locations: ',
      error,
    );
    throw new Error('Error fecthing locations from Geonames API');
  }
};
