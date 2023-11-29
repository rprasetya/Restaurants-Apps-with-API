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