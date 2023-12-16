/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery';
import { loadHtml } from './loadHtml';

export const loadFav = async () => {
  const dataRestHtml = await loadHtml();
  $(() => {
    $('.contentFavCont').html(dataRestHtml);
  });
};
