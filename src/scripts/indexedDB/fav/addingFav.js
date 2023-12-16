/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { openDB } from 'idb';

export const addingFav = async (pictureId) => {
  const db = await openDB('Restaurants-Apps', 1);
  const transaction = db.transaction('addFavorite', 'readwrite');
  const objectStore = transaction.objectStore('addFavorite');
  const request = objectStore.add('', pictureId);
  request.onsuccess = () => {
    console.log('Data added successfully to myObjectStore');
  };
  request.onerror = (event) => {
    console.error('Error adding data to myObjectStore:', event.target.error);
  };
  transaction.oncomplete = () => {
    console.log('Transaction completed successfully');
  };
  transaction.onerror = (event) => {
    console.error('Transaction failed:', event.target.error);
  };
};
