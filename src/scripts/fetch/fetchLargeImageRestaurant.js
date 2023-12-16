/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const fetchLargeImageRestaurant = async (restaurants) => {
  const imagePromises = restaurants.map(async (restaurant) => {
    const apiUrl = `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data.restaurants;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const restaurantLargeImage = await Promise.all(imagePromises);
  return restaurantLargeImage;
};
