const {BasePo} = require("./base.po");

class SearchDialogPo extends BasePo {
  get input() {
    return $(".DocSearch-Input");
  }

  get item() {
    return $(".DocSearch-Hit-Container");
  }

  get items() {
    return $$(".DocSearch-Hit-Container");
  }

  get staticElement() {
    return this.input;
  }
}

module.exports.SearchDialogPo = SearchDialogPo;
