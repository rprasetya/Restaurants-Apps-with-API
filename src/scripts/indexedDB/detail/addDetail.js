/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import {
  set,
  clear,
} from 'idb-keyval';

export const addDetail = async (idRest) => {
  clear();
  set(idRest).then((response) => response);
};
