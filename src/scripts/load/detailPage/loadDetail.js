import { getDetailAPI } from "../../fetch/getDetailAPI";
import { loadReviewsHtml } from "./loadReviewsHtml";
import $ from 'jquery';

export const loadDetail = async () => {
  loadReviewsHtml();
  const dataDetail = await getDetailAPI();
  $(() => {
    $('.detailTitle h1').text(dataDetail.name.toUpperCase());
    $('.picDetail picture source').attr('srcset', `https://restaurant-api.dicoding.dev/images/medium/${dataDetail.pictureId}`);
    $('.picDetail picture img').attr('src', `https://restaurant-api.dicoding.dev/images/large/${dataDetail.pictureId}`);
    $('.adrCityDetail').text(`${dataDetail.address}, ${dataDetail.city}`);
    $('.desc').text(dataDetail.description);
    $('.food').html(dataDetail.menus.foods.map((food) => food.name).join('<br>').toUpperCase());
    $('.drink').html(dataDetail.menus.drinks.map((drink) => drink.name).join('<br>').toUpperCase());
  });
};