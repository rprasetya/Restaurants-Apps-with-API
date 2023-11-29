/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/fav.css';
import $ from 'jquery';
import axios, { all } from 'axios';
import { async } from 'regenerator-runtime';
import { keys, createStore } from 'idb-keyval';

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

const fecthDetailRest = async (idRest) => {
  const apiUrl = `https://restaurant-api.dicoding.dev/detail/${idRest}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.restaurant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFavRest = async () => {
  const customStore = createStore('Restaurants-Apps', 'addFavorite');
  const favRest = await keys(customStore).then((response) => response);
  return favRest;
};

const loadHtml = async () => {
  const dataFavRest = await getFavRest();
  const showHtmlPromises = dataFavRest.map(async (data) => {
    const detailApiRest = await fecthDetailRest(data);
    return `
      <div class="contentFav">
        <div class="detail">
          <span class="nameRest">${detailApiRest.name}</span>
          <div class="contentCont">
            <span>CITY</span>
            <span class="cityRest">${detailApiRest.city}</span>
          </div>
          <div class="contentCont">
            <span>ADDRESS</span>
            <span class="addressRest">${detailApiRest.address}</span>
          </div>
          <div class="descRestCont">
            <span>DESCRIPTION</span>
            <span class="descRest">${detailApiRest.description}</span>
          </div>
          <div class="contentCont">
            <span>FOODS MENU</span>
            <span class="foods">${detailApiRest.menus.foods.map((food) => food.name).join(', ')}</span>
          </div>
          <div class="contentCont">
            <span>DRINKS MENU</span>
            <span class="drinks">${detailApiRest.menus.drinks.map((drink) => drink.name).join(', ')}</span>
          </div>
        </div>
        <div class="pic">
            <img src="https://restaurant-api.dicoding.dev/images/medium/29" alt="">
        </div>
      </div>
    `;
  });

  // Menunggu semua promise selesai
  const showHtml = await Promise.all(showHtmlPromises);

  return showHtml;
};

const load = async () => {
  const dataRestHtml = await loadHtml();
  // console.log(dataRestHtml);
  $(() => {
    $('.contentFavCont').html(dataRestHtml);
  });
  // dataRestHtml.forEach((data) => {
  // });
};

load();
