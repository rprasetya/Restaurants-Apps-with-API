/* eslint-disable linebreak-style */
/* eslint-disable no-else-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { Workbox } from 'workbox-window';

const pushNotif = () => {
  if (!("Notification" in window)) {
    console.log("Browser tidak mendukung notifikasi");
  } else if(Notification.permission !== "denied") {
    console.log('hah');
  }
};

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }
  const wb = new Workbox('./sw.bundle.js');
  try {
    await wb.register();
    console.log('Service worker registered');
    pushNotif();

  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

export default swRegister;
