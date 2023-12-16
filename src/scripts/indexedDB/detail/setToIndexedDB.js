/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import {
  set,
  clear,
} from 'idb-keyval';

export const setToIndexedDB = async (idRest) => {
  clear();
  set(idRest).then((response) => response);
};
