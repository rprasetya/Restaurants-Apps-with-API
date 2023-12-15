import axios from "axios";
import {
  set,
  keys,
} from 'idb-keyval';

export const getDetailAPI = async () => {
  try {
    const idRest = await keys().then((response) => response);
    const apiUrl = `https://restaurant-api.dicoding.dev/detail/${idRest}`;
    const response = await axios.get(apiUrl);
    const restaurantData = response.data.restaurant;

    if (!restaurantData) {
      throw new Error('Invalid response format');
    }
    return restaurantData;
  } catch (error) {
    set('rqdv5juczeskfw1e867');
    const idRest = await keys().then((response) => response);
    const apiUrl = `https://restaurant-api.dicoding.dev/detail/${idRest}`;
    const response = await axios.get(apiUrl);
    const restaurantData = response.data.restaurant;

    if (!restaurantData) {
      throw new Error('Invalid response format');
    }
    return restaurantData;
  }
};