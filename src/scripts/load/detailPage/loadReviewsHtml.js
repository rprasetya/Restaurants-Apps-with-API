import { loadReviews } from "./loadReviews";
import $ from 'jquery';

export const loadReviewsHtml = async () => {
  $(() => {
    (async () => {
      try {
        const htmlReviews = await loadReviews();
        if (htmlReviews) {
          $('.reviewsCont').html(htmlReviews);
        } else {
          console.error('Error loading content');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  });
};