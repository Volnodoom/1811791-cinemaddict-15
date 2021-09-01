import AbstractView from './abstract.js';

const createEmptyCondition = (message) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section>
  </section>`
);

class EmptyCondition extends AbstractView{
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate () {
    return createEmptyCondition(this._message);
  }
}

export default EmptyCondition;
