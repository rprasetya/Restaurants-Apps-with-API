/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery';
import {
  createStore,
  keys,
} from 'idb-keyval';

export const checkFav = async (idRest) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const entriesData = await keys(customStore).then((response) => response);
  entriesData.forEach(async (entry) => {
    if (entry === idRest) {
      $(() => {
        $('.addFav').addClass('onFav');
      });
    }
  });
};
