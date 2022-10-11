const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");

const desiredNumberOfViews = 2000;
const pageLimit = 3;
let currentPage = 1;

async function main() {
  let driver = await new Builder().forBrowser("chrome").build();
  const interestingArticles = [];
  try {
    await driver.get("https://dou.ua/");
    await driver.findElement(By.css('[href="https://dou.ua/lenta/"]')).click(); // click on news page
    do {
      console.log("Page:", currentPage);
      const newsColumn = await driver.findElement(By.className("b-lenta"));
      await driver.wait(until.elementIsVisible(newsColumn), 5000); // wait for the news block to appear
      const newsCards = await driver.findElements(By.className("b-postcard")); // get all news cards
      for (const news of newsCards) {
        const views = await news
          .findElement(By.className("pageviews"))
          .getText();
        const numberOfViews = Number(views);
        if (numberOfViews >= desiredNumberOfViews) {
          const newsTitle = await news.findElement(By.className("title"));
          const titleText = await newsTitle.getText();
          const titleLink = await newsTitle
            .findElement(By.css("a"))
            .getAttribute("href");
          interestingArticles.push({
            title: titleText,
            pageViews: numberOfViews,
            link: titleLink,
          });
          console.log(
            "titleLink:",
            titleLink,
            "titleText:",
            titleText,
            "numberOfViews:",
            numberOfViews
          );
        }
      }
      console.log(interestingArticles);
      const nextPageNumberLocator = `[href="/lenta/page/${++currentPage}/"]`;
      await driver.findElement(By.css(nextPageNumberLocator)).click();
    } while (currentPage <= pageLimit);
  } finally {
    await driver.quit();
    fs.writeFileSync("./articles.html", constructPage(interestingArticles));
  }
}

function constructPage(articles) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Most visited</title>
  </head>
  <body>
    <h2>Most visited:</h2>
      ${articles
        .map(
          (article) =>
            `<div>${article.pageViews} views: <a href="${article.link}">${article.title}</a></div>`
        )
        .join("\n")}
  </body>
</html>`;
  /** EMPTY PAGES EXAMPLE FROM
   * https://codepen.io/rickgomez223/pen/ExxzbKG
   * https://gist.github.com/MrChuffmanSnippets/2043416
   * https://www.codegrepper.com/code-examples/html/html+blank+page+template **/
}

main().catch((error) => console.log("Got error:", error));
