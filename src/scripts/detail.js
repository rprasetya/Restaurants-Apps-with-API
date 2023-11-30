/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-duplicates */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/detail.css';
import $ from 'jquery';
import axios from 'axios';
// import { async } from 'regenerator-runtime';
import { keys } from 'idb-keyval';

// const 
$(() => {
  // eslint-disable-next-line func-names
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.headerDetail').css({
        'background-color': 'var(--accent-col)',
        'padding-block': '1vh',
      });
    } else {
      $('.headerDetail').css('background', 'none');
    }
  });
});

const getDetailAPI = async () => {
  const idRest = await keys().then((response) => response);
  const apiUrl = `https://restaurant-api.dicoding.dev/detail/${idRest}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.restaurant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadDetail = async () => {
  const dataDetail = await getDetailAPI();
  $(() => {
    $('.detailTitle h1').text(dataDetail.name.toUpperCase());
    $('.picDetail img').attr('src', `https://restaurant-api.dicoding.dev/images/large/${dataDetail.pictureId}`);
    $('.adrCityDetail').text(`${dataDetail.address}, ${dataDetail.city}`);
    $('.desc').text(dataDetail.description);
    $('.food').html(dataDetail.menus.foods.map((food) => food.name).join('<br>').toUpperCase());
    $('.drink').html(dataDetail.menus.drinks.map((drink) => drink.name).join('<br>').toUpperCase());
  });
};

loadDetail();
