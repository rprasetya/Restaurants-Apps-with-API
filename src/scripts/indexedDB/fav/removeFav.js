import {
  del,
  createStore,
} from 'idb-keyval';

export const removeFav = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  del(pictureId, customStore);
};