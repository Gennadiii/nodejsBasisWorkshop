class BasePo {
  get staticElement() {
    throw new Error("page must have a static element");
  }

  async isOpen() {
    try {
      return await this.staticElement.isDisplayed();
    } catch {
      return false;
    }
  }

  async verifyIsOpen() {
    if (!(await this.isOpen())) {
      throw new Error(`page "${this.constructor.name}" didn't get opened`);
    }
  }
}

module.exports.BasePo = BasePo;
