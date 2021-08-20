import Abstract from '../abstract.js';

const createPopupCommentsTitle = (film) => `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>`;

class PopupCommentsTitle extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }
}

export default PopupCommentsTitle;
