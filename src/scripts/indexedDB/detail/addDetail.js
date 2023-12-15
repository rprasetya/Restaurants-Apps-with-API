import {
  set,
  clear,
} from 'idb-keyval';

export const addDetail = async (idRest) => {
  clear();
  set(idRest).then((response) => response);
};
