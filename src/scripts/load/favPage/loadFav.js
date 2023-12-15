import { loadHtml } from "./loadHtml";
import $ from 'jquery';

export const loadFav = async () => {
  const dataRestHtml = await loadHtml();
  $(() => {
    $('.contentFavCont').html(dataRestHtml);
  });
};