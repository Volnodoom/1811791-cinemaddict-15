import AbstractView from './abstract.js';

const BUTTON_CALL = 'Show more';

const createButtonShowMore = () => (
  `<button class="films-list__show-more">${BUTTON_CALL}</button>`
);

class ButtonShowMoreView extends AbstractView {
  constructor(){
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate () {
    return createButtonShowMore();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler (callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

}

export default ButtonShowMoreView;
