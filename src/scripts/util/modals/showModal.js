/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import $ from 'jquery';
import { addDetail } from '../../indexedDB/detail/addDetail';
import { checkFav } from '../../indexedDB/home/checkFav';
import { modals } from './modals';

export const showModal = async (idRest) => {
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
