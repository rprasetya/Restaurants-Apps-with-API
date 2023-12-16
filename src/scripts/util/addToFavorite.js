/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import {
  createStore,
  keys,
} from 'idb-keyval';
import { addingFav } from '../indexedDB/fav/addingFav';
import { removeFav } from '../indexedDB/fav/removeFav';

export const addToFavorite = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const entriesData = await keys(customStore).then((response) => response);
  if (entriesData.includes(pictureId)) {
    removeFav(pictureId);
    return;
  }
  addingFav(pictureId);
};
