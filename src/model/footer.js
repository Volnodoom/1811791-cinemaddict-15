import { createElement, FooterCondition } from '../other/utils.js';

const footerTemplateForBlankWithoutMovie = `<p>${FooterCondition.empty}</p>`;
const footerTemplateForUpToDate = `<p>${FooterCondition.upToDate}</p>`;

class Footer {
  constructor(message) {
    this.message = message;
    this._element = null;
  }

  getTemplate () {
    if (this.message === FooterCondition.empty) {
      return footerTemplateForBlankWithoutMovie;
    } else {
      return footerTemplateForUpToDate;
    }
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}

export default Footer;
