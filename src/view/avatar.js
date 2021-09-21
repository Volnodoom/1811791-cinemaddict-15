import { rankTitle } from '../utils/statistics-utils.js';
import Smart from './smart.js';

const USER = {
  avatarUrl: 'images/bitmap@2x.png',
};

class Avatar extends Smart {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._rank = null;
    this._processModelEvent = this._processModelEvent1.bind(this);
    // this._filmsModel.addObserver(this._processModelEvent1);
  }

  getTemplate () {
    if (this._rank === 0 || this._rank === undefined) {
      return `<section class="header__profile profile">
         <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
      </section>`;
    }
    else
    { return `<section class="header__profile profile">
        <p class="profile__rating">${this._rank}</p>
        <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
      </section>`;}
  }

  _processModelEvent1() {
    this._rank = rankTitle(this._filmsModel.getMovies());
    this.removeElement();
    this.getElement();
    // this._rank = rankTitle(this._films);

    // this._clearAvatar();
    // this._renderAvatar();

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
