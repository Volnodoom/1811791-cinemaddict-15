import { createElement } from '../other/utils.js';

const createEmptyCondition = (message) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section>
  </section>`
);

class EmptyCondition {
  constructor(message) {
    this._message = message;
    this._element = null;
  }

  getTemplate () {
    return createEmptyCondition(this._message);
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

export default EmptyCondition;
