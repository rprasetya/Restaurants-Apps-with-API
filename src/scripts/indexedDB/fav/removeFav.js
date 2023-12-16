/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import {
  del,
  createStore,
} from 'idb-keyval';

export const removeFav = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  del(pictureId, customStore);
};
