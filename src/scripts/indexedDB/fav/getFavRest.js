import {
  createStore,
  keys,
} from 'idb-keyval';

export const getFavRest = async () => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const favRest = await keys(customStore).then((response) => response);
  return favRest;
};