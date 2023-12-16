/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
Feature('Add Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/fav.html');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.dontSeeElement('.contentFav');
});

Scenario('add favorite restaurant and show it', ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.card');
  I.click(locate('.card').first());
  I.click(locate('.addFav').first());
  I.amOnPage('/fav.html');
  I.seeElement('.contentFav');
  I.amOnPage('/fav.html');
  I.seeElement('.contentFav');
});

Scenario('remove favorite restaurant and show it', ({ I }) => {
  I.amOnPage('/');
  I.click(locate('.card').first());
  I.click(locate('.addFav').first());
  I.amOnPage('/fav.html');
  I.seeElement('.contentFav');

  I.amOnPage('/');
  I.click(locate('.card').first());
  I.click(locate('.addFav').first());
  I.amOnPage('/fav.html');
  I.dontSeeElement('.contentFav');
});
