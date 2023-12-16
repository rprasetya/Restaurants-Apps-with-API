/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const fecthDetailRest = async (idRest) => {
  const apiUrl = `https://restaurant-api.dicoding.dev/detail/${idRest}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.restaurant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
