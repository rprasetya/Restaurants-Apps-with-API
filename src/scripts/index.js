/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
import 'regenerator-runtime/runtime';
import '../styles/main.css';
import '../styles/fav.css';
import '../styles/detail.css';
import $ from 'jquery';
import swRegister from './sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'jquery-inview';
import { loadDetail } from './load/detailPage/loadDetail';
import { loadFav } from './load/favPage/loadFav';
import { addToFavorite } from './util/addToFavorite';
import { setToIndexedDB } from './indexedDB/detail/setToIndexedDB';
import { showModal } from './util/modals/showModal';
import { load } from './load/homePage/load';

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

window.showModal = showModal;

window.addToFavorite = addToFavorite;

// fav.js
window.setToIndexedDB = setToIndexedDB;

loadFav();

// detail.js
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

loadDetail();
