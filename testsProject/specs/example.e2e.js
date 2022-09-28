const {page} = require("../src/pageObjects/page");

describe("Click documentation", () => {
  it("should search for click article", async () => {
    await browser.url("");
    await page.landing.verifyIsOpen();
    await page.landing.searchButton.click();
    await page.searchDialog.verifyIsOpen();
    await page.searchDialog.input.setValue("click");
    await page.searchDialog.item.waitForDisplayed({timeout: 2000});
    await expect(await page.searchDialog.items.length).toBe(11);
    await page.searchDialog.items[0].click();
    await page.article.verifyIsOpen();
    await expect(await page.article.header.getText()).toBe("click");
  });
});
