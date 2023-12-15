import { displayModal } from "./displayModal";

export const modals = async (idRest) => {
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