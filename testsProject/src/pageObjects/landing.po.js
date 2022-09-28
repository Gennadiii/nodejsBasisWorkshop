const {BasePo} = require("./base.po");

class LandingPo extends BasePo {
  get searchButton() {
    return $(".DocSearch-Button");
  }

  get staticElement() {
    return this.searchButton;
  }
}

module.exports.LandingPo = LandingPo;
