import {
  set,
  clear,
} from 'idb-keyval';

export const setToIndexedDB = async (idRest) => {
  clear();
  set(idRest).then((response) => response);
};