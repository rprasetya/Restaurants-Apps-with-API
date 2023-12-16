/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const { checkFav } = require('../src/scripts/indexedDB/home/checkFav');
const { addToFavorite } = require('../src/scripts/util/addToFavorite');

describe('Add Favorite Button Test', () => {
  it('liking should be getting into indexedDB', async () => {
    const addFunction = await addToFavorite('s1knt6za9kkfw1e867');
    const checkFunction = await checkFav('s1knt6za9kkfw1e867');
    expect(addFunction).toBe(checkFunction);
  });

  it('unliking should be get out from indexedDB', async () => {
    const addFunction = await addToFavorite('s1knt6za9kkfw1e867');
    const checkFunction = await checkFav('s1knt6za9kkfw1e867');
    expect(addFunction).toBeFalsy(checkFunction);
  });
});
