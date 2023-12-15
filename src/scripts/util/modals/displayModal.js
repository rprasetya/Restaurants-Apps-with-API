import $ from 'jquery';

export const displayModal = (dataModal) => {
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