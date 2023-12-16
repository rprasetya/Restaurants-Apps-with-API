/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const fetchAPIRestaurantsAll = async () => {
  const apiUrl = 'https://restaurant-api.dicoding.dev/list';
  try {
    const response = await axios.get(apiUrl);
    return response.data.restaurants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
