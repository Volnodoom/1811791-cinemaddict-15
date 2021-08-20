import Abstract from '../abstract.js';

const createPopupCommentsTitle = (film) => `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>`;

class PopupCommentsTitle extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createPopupCommentsTitle(this._film);
  }
}

export default PopupCommentsTitle;
