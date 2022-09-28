const {ArticlePo} = require("./article.po");
const {LandingPo} = require("./landing.po");
const {SearchDialogPo} = require("./searchDialog.po");

module.exports.page = {
  article: new ArticlePo(),
  landing: new LandingPo(),
  searchDialog: new SearchDialogPo(),
};
