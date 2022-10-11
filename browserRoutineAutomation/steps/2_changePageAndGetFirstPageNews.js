const { Builder, By, Key, until } = require("selenium-webdriver");

async function main() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://dou.ua/");
    await driver.findElement(By.css('[href="https://dou.ua/lenta/"]')).click(); // click on news page
    const newsColumn = await driver.findElement(By.className("b-lenta"));
    await driver.wait(until.elementIsVisible(newsColumn), 5000); // wait for the news block to appear
    const newsCards = await driver.findElements(By.className("b-postcard")); // get all news cards
    for (const news of newsCards) {
      const newsTitle = await news.findElement(By.className("title"));
      const titleText = await newsTitle.getText();
      const titleLink = await newsTitle
        .findElement(By.css("a"))
        .getAttribute("href");
      const views = await news.findElement(By.className("pageviews")).getText();
      const numberOfViews = Number(views);
      console.log(
        "titleLink:",
        titleLink,
        "titleText:",
        titleText,
        "numberOfViews:",
        numberOfViews
      );
    }
  } finally {
    await driver.quit();
  }
}

main().catch((error) => console.log("Got error:", error));
