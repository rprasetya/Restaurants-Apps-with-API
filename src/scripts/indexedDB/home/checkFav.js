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