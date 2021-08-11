import { createElement } from '../other/utils.js';

const createFrameworkForExtraTop = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

class TopCards {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createFrameworkForExtraTop();
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

export default TopCards;
