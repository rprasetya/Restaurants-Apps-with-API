Feature('Add Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/fav.html');
});

Scenario('showing empty favorite restaurant',  ({ I }) => {
  I.dontSeeElement('.contentFav');
  
  I.amOnPage('/');
  I.seeElement('.card');
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
