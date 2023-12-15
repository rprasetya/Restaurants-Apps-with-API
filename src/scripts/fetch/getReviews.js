import axios from "axios";
import { getDetailAPI } from "./getDetailAPI";

export const getReviews = async () => {
  try {
    const dataDetail = await getDetailAPI();
    const apiUrl = 'https://restaurant-api.dicoding.dev/review';
    const header = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      "id": dataDetail.id,
      "name": dataDetail.name,
      "review": 'customerReviews',
    };
    const response = await axios.post(apiUrl, body, header);
    return response.data.customerReviews;
  } catch (error) {
    console.error('Error:', error.response.data);
    throw error.response.data;
  }
};
