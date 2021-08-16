import { FooterCondition } from '../utils/render.js';
import AbstractView from './abstract.js';

const footerTemplateForBlankWithoutMovie = `<p>${FooterCondition.empty}</p>`;
const footerTemplateForUpToDate = `<p>${FooterCondition.upToDate}</p>`;

class Footer extends AbstractView{
  constructor(message) {
    super();
    this.message = message;
  }

  getTemplate () {
    if (this.message === FooterCondition.empty) {
      return footerTemplateForBlankWithoutMovie;
    } else {
      return footerTemplateForUpToDate;
    }
  }
}

export default Footer;
