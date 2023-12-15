import { addingFav } from "../indexedDB/fav/addingFav";
import { removeFav } from "../indexedDB/fav/removeFav";
import {
  createStore,
  keys,
} from 'idb-keyval';

export const addToFavorite = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const entriesData = await keys(customStore).then((response) => response);
  if (entriesData.includes(pictureId)) {
    removeFav(pictureId);
    return;
  }
  addingFav(pictureId);
};