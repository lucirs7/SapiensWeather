import axios from 'axios';

const GEONAMES_USERNAME = 'aicul78';

export interface Location {
  id: number;
  name: string;
  countryName: string;
}

export const fetchLocations = async (searchQuery: string): Prommise<Location[]> => {

}
