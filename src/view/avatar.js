import { UpdateType } from '../const.js';
import { rankTitle } from '../utils/statistics-utils.js';
import Smart from './smart.js';

const USER = {
  avatarUrl: 'images/bitmap@2x.png',
};

class Avatar extends Smart {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._data = rankTitle(this._filmsModel.getMovies());

    // this._filmsModel.addObserver(this._processModelEvent);
  }

  getTemplate () {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._data}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`;
  }

  _processModelEvent(updateType, data) {
    if (updateType === UpdateType.PATCH || UpdateType.INIT) {
      this._clearAvatar();
      this._renderAvatar();
    }
  }

  _clearAvatar() {
    Avatar.removeElement();
  }

  _renderAvatar() {
    Avatar.getElement();
  }

  restoreHandlers() {

  }
}

export default Avatar;
