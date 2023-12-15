import axios from "axios";

export const fetchDetailRestaurant = async (restaurants) => {
  const detailPromises = restaurants.map(async (restaurant) => {
    const apiUrl = `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data.restaurants;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const restaurantDetails = await Promise.all(detailPromises);
  return restaurantDetails;
};