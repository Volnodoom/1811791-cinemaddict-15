import AbstractView from './abstract.js';

const createForAllCardsTemplate = () => (
  `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

class CardsContainer extends AbstractView{
  constructor() {
    super();
    this._element = null;
  }

  getTemplate () {
    return createForAllCardsTemplate();
  }
}

export default CardsContainer;
