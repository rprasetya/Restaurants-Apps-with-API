const { checkFav } = require("../src/scripts/indexedDB/home/checkFav")
const { addToFavorite } = require("../src/scripts/util/addToFavorite")

describe("Add Favorite Button Test", () => {
  it("should be getting into indexedDB", async () => {
    const addFunction = await addToFavorite('rqdv5juczeskfw1e867')
    const checkFunction = await checkFav('rqdv5juczeskfw1e867')
    expect(addFunction).toBe(checkFunction)
  })
})

