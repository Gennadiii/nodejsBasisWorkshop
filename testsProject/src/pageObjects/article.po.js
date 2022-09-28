const {BasePo} = require("./base.po");

class ArticlePo extends BasePo {
  get header() {
    return $("article header h1");
  }

  get staticElement() {
    return this.header;
  }
}

module.exports.ArticlePo = ArticlePo;
