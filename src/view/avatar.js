import { rankTitle } from '../utils/statistics-utils.js';
import AbstractView from './abstract.js';

const USER = {
  avatarUrl: 'images/bitmap@2x.png',
};

class Avatar extends AbstractView {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._data = rankTitle(this._filmsModel.getMovies());
  }

  getTemplate () {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._data}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`;
  }
}

export default Avatar;
