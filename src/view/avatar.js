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
  constructor(filmsModel, api) {
    super();
    this._filmsModel = filmsModel;
    this._api = api;
    this._rank = null;
    this._processModelEvent = this._processModelEvent1.bind(this);
    this._filmsModel.addObserver(this._processModelEvent1);
  }

  getTemplate () {
    return avatarTemplate(this._rank);
  }

  _processModelEvent1(fer, films) {
    debugger;

    // this._api.getGeneralData()
    // .then(() => {
    //   this._rank = rankTitle(this._filmsModel.getMovies());
    //   this.removeElement();
    //   this.getElement();
    // })
    // .catch(() => {
    //   // this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
    //   throw new Error('Could not update avatar state');
    // });
    if (films.length === 0) {
      return;
    }
    this._rank = rankTitle(films);
    // const films = this._filmsModel.getMovies();
    // this._rank = rankTitle(this._filmsModel.getMovies());
    Avatar.removeElement();
    Avatar.getElement();
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
