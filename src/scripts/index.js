/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import $ from 'jquery';
import axios from 'axios';
import { async } from 'regenerator-runtime';
import {
  set,
  del,
  createStore,
  keys,
  clear,
} from 'idb-keyval';
import { openDB } from 'idb';
import swRegister from './sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'jquery-inview';

const START = 10;
const NUMBER_OF_IMAGES = 100;

swRegister();

$(() => {
  // eslint-disable-next-line func-names
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('header').css({
        'background-color': 'var(--color)',
        'padding-block': '1vh',
      });
      $('header h1').css('font-size', 'clamp(7px, .8vw, 100px)');
      $('header nav a').css('font-size', 'clamp(13px, 1vw, 100px');
    } else {
      $('header').css('background', 'none');
      $('header h1').css('font-size', 'clamp(8px, 1.3vw, 100px)');
      $('header nav a').css('font-size', 'clamp(13px, 1.1vw, 100px)');
    }
  });
  $('.hamburger').on('click', () => {
    $('.hamburger span').toggleClass('activeHamb');
    $('header nav').toggleClass('activeNav');
  });
});

const fetchAPIRestaurantsAll = async () => {
  const apiUrl = 'https://restaurant-api.dicoding.dev/list';
  try {
    const response = await axios.get(apiUrl);
    return response.data.restaurants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchDetailRestaurant = async (restaurants) => {
  const detailPromises = restaurants.map(async (restaurant) => {
    const apiUrl = `https://restaurant-api.dicoding.dev/detail/${restaurant.id}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data.restaurants;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const restaurantDetails = await Promise.all(detailPromises);
  return restaurantDetails;
};

const fetchLargeImageRestaurant = async (restaurants) => {
  const imagePromises = restaurants.map(async (restaurant) => {
    const apiUrl = `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data.restaurants;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  const restaurantLargeImage = await Promise.all(imagePromises);
  return restaurantLargeImage;
};

const load = async () => {
  const restaurants = await fetchAPIRestaurantsAll();
  await fetchDetailRestaurant(restaurants);
  await fetchLargeImageRestaurant(restaurants);
  const customElements = [];
  restaurants.forEach((restaurant) => {
    customElements.push(`
        <div class="card lazy-background" onclick="showModal('${restaurant.id}')"style="background-image: url(https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId});">
          <div class="cardContent">
            <a href="#">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#EEE6F3" version="1.1" id="Capa_1" viewBox="0 0 36.09 36.09" xml:space="preserve">
                  <g>
                    <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596   s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055   l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191   c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02   l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957   l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957   l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592   l9.87,1.002L25.336,21.598z"/>
                  </g>
                </svg>
                ${restaurant.rating}
              </span>
              <span>${restaurant.name}.</span>
              <span>${restaurant.city}</span>
            </a>
          </div>
        </div>
    `);
  });
  return customElements;
};

$(() => {
  $('.lazy-background').on('inview', (event, isInView) => {
    if (isInView) {
      const $this = $(this);
      const bg = $this.data('bg');
      $this.css('background-image', bg);
    }
  });
});

$(() => {
  (async () => {
    try {
      const content = await load();
      if (content) {
        $('.cardCont').html(content);
      } else {
        console.error('Error loading content');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })();
});

$(() => {
  $('.modalsCont').css({
    background: 'none',
    transform: 'translateY(-100vh)',
    'z-index': '0',
    top: '-100vh',
  });

  $('.modal').css({
    transform: 'translateY(-100vh)',
    opacity: '0',
  });

  $('.closeModalBtn').on('click', () => {
    $('.modalsCont').css({
      'backgrond-color': 'transparent',
      transform: 'translateY(-100vh)',
    });
    $('.modal').css({
      transform: 'translateY(-100vh)',
      transition: '.7s ease-in-out',
      opacity: '1',
      top: '-100vh',
    });
    $('.addFav').removeAttr('id');
    $('.addFav').removeClass('onFav');
  });

  $('.addFav').on('click', () => {
    $('.addFav').toggleClass('onFav');
  });
});

const displayModal = (dataModal) => {
  $(() => {
    $('.modalTitle h1').text(dataModal.name);
    $('.modalContent .image img').attr('data-src', `https://restaurant-api.dicoding.dev/images/large/${dataModal.pictureId}`);
    $('.cityModal').text(dataModal.city);
    $('.descModal').text(dataModal.description);
    $('.addFav').attr('onclick', `addToFavorite('${dataModal.id}')`)
      .attr('id', `${dataModal.id}`);
    $('.goToDetailBtn').attr('href', './detail.html');
  });
};

const modals = async (idRest) => {
  const xhttp = new XMLHttpRequest();
  // eslint-disable-next-line func-names
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const dataModal = data.restaurant;
      displayModal(dataModal);
    }
  };
  xhttp.open('GET', `https://restaurant-api.dicoding.dev/detail/${idRest}`, true);
  xhttp.send();
};

const checkFav = async (idRest) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const entriesData = await keys(customStore).then((response) => response);
  entriesData.forEach(async (entry) => {
    if (entry === idRest) {
      $(() => {
        $('.addFav').addClass('onFav');
      });
    }
  });
};

const addDetail = async (idRest) => {
  clear();
  set(idRest).then((response) => response);
};

window.showModal = async (idRest) => {
  modals(idRest);
  checkFav(idRest);
  addDetail(idRest);
  $(() => {
    $('.modalsCont').css({
      'background-color': 'rgba(0, 0, 0, 0.507)',
      transform: 'translateY(0vh)',
      top: '0vh',
      'z-index': '2',
    });
    $('.modal').css({
      transform: 'translateY(0vh)',
      opacity: '1',
      transition: '.7s ease-in-out',
    });
  });
};

const addingFav = async (pictureId) => {
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

const removeFav = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  del(pictureId, customStore);
};

window.addToFavorite = async (pictureId) => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const entriesData = await keys(customStore).then((response) => response);
  if (entriesData.includes(pictureId)) {
    removeFav(pictureId);
    return;
  }
  addingFav(pictureId);
};

// export const Test = () => {
//   addingFav(pictureId).init({
//     likeButtonContainer: document.querySelector('.addFav'),
//     movie: {
//       id: movie.id,
//       title: movie.title,
//       overview: movie.overview,
//       backdrop_path: movie.backdrop_path,
//       vote_average: movie.vote_average,
//     },
//   });;
// }
