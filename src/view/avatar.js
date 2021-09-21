import { rankTitle } from '../utils/statistics-utils.js';
import Smart from './smart.js';

const USER = {
  avatarUrl: 'images/bitmap@2x.png',
};

const avatarTemplate = (title) => {
  if (title === 0 || title === null) {
    return `<section class="header__profile profile">
     <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`;
  }
  else
  {return `<section class="header__profile profile">
    <p class="profile__rating">${title}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`;}
};

class Avatar extends Smart {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._rank = null;

    this._processModelEventInAvatar = this._processModelEventInAvatar.bind(this);
    this._filmsModel.addObserver(this._processModelEventInAvatar);
  }

  getTemplate () {
    return avatarTemplate(this._rank);
  }

  _processModelEventInAvatar() {
    const films = this._filmsModel.getMovies();
    this._rank = rankTitle(films);

    this.updateData({
      title: this._rank,
    });
  }

  restoreHandlers() {

  }
}

export default Avatar;
