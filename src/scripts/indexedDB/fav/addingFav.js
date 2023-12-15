import { openDB } from 'idb';

export const addingFav = async (pictureId) => {
  const db = await openDB('Restaurants-Apps', 1);
  const transaction = db.transaction('addFavorite', 'readwrite');
  const objectStore = transaction.objectStore('addFavorite');
  const request = objectStore.add('', pictureId);
  request.onsuccess = (event) => {
    console.log('Data added successfully to myObjectStore');
  };
  request.onerror = (event) => {
    console.error('Error adding data to myObjectStore:', event.target.error);
  };
  transaction.oncomplete = (event) => {
    console.log('Transaction completed successfully');
  };
  transaction.onerror = (event) => {
    console.error('Transaction failed:', event.target.error);
  };
};