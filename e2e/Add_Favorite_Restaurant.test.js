import { Test } from "../src/scripts";

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
});

describe('Liking A Movie', () => {
    it('should show the like button when the movie has not been liked before', async () => {
        document.body.innerHTML = '<div class="addFav"></div>';
        
        await Test.init({
        test: document.querySelector('.addFav'),
        movie: {
            id: 1,
        },
        });
    expect(document.querySelector('.onFav')).toBeTruthy();
    });
});
