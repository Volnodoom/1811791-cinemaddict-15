import { createElement } from '../other/utils.js';

const BUTTON_CALL = 'Show more';

const createButtonShowMore = () => (
  `<button class="films-list__show-more">${BUTTON_CALL}</button>`
);

class ButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createButtonShowMore();
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

export default ButtonShowMore;
