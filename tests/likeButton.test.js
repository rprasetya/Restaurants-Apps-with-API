import addToFavorite from "../src/scripts/index";

describe("Add Favorite Function Test", () => {
  it("should be getting into indexedDB", async () => {
    const addFunction = await addToFavorite('rqdv5juczeskfw1e867')
    expect(addFunction).toBeCalled
  })
})

