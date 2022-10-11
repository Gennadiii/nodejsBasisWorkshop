const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

const desiredNumberOfViews = 2000;
const pageLimit = 3;
let currentPage = 1;

async function main() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub")
    .build();
  const douPo = new DouPo();
  const interestingArticles = [];
  try {
    await driver.get("https://dou.ua/");
    await driver.findElement(douPo.newsPage).click(); // click on news page
    do {
      console.log("Page:", currentPage);
      const newsColumn = await driver.findElement(douPo.newsColumn);
      await driver.wait(until.elementIsVisible(newsColumn), 5000); // wait for the news block to appear
      const newsCards = await driver.findElements(douPo.newsCard); // get all news cards
      for (const news of newsCards) {
        const views = await news.findElement(douPo.views).getText();
        const numberOfViews = Number(views);
        if (numberOfViews >= desiredNumberOfViews) {
          const newsTitle = await news.findElement(douPo.newsTitle);
          const titleText = await newsTitle.getText();
          const titleLink = await newsTitle
            .findElement(douPo.hrefPlaceholder)
            .getAttribute("href");
          interestingArticles.push({
            title: titleText,
            pageViews: numberOfViews,
            link: titleLink,
          });
        }
      }
      console.log(interestingArticles);
      await driver.findElement(douPo.getNextPageLocator(++currentPage)).click();
    } while (currentPage <= pageLimit);
  } finally {
    await driver.quit();
    fs.writeFileSync("./articles.html", constructPage(interestingArticles));
  }
}

main().catch((error) => console.log("Got error:", error));

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

class DouPo {
  get newsPage() {
    return By.css('[href="https://dou.ua/lenta/"]');
  }

  get newsColumn() {
    return By.className("b-lenta");
  }

  get newsCard() {
    return By.className("b-postcard");
  }

  get newsTitle() {
    return By.className("title");
  }

  get views() {
    return By.className("pageviews");
  }

  get hrefPlaceholder() {
    return By.css("a");
  }

  getNextPageLocator(nextPage) {
    return By.css(`[href="/lenta/page/${nextPage}/"]`);
  }
}
