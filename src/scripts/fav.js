/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/fav.css';
import $ from 'jquery';
import axios from 'axios';
import { async } from 'regenerator-runtime';
import { keys, createStore } from 'idb-keyval';

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
          <span class="nameRest">${detailApiRest.name.toUpperCase()}</span>
          <div class="ratingCont">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 36.09 36.09" xml:space="preserve">
              <g>
                <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596   s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055   l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191   c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02   l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957   l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957   l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592   l9.87,1.002L25.336,21.598z"/>
              </g>
            </svg>
            <span class="addressRest">${detailApiRest.rating}</span>
          </div>
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
        </div>
        <div class="pic">
          <img class="imgFav" src="https://restaurant-api.dicoding.dev/images/large/${detailApiRest.pictureId}" alt="">
          <div class="contentCont">
            <span>FOODS MENU</span>
            <span class="foods">${detailApiRest.menus.foods.map((food) => food.name).join(', ')}</span>
          </div>
          <div class="contentCont">
            <span>DRINKS MENU</span>
            <span class="drinks">${detailApiRest.menus.drinks.map((drink) => drink.name).join(', ')}</span>
          </div>
        </div>
      </div>
    `;
  });
  const showHtml = await Promise.all(showHtmlPromises);
  return showHtml;
};

const load = async () => {
  const dataRestHtml = await loadHtml();
  $(() => {
    $('.contentFavCont').html(dataRestHtml);
  });
};

load();
