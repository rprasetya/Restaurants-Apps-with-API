/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery';
import { loadReviews } from './loadReviews';

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
