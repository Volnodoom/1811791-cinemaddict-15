import { dateDayMonthYear, calculateTime, PopupCardEventOn } from '../../utils/card-utils';
import AbstractView from '../abstract';

const ACTIVE_STATE_CLASS = 'film-details__control-button--active';

const createGenre = (genreData) => {
  let genreLine = '';
  if (genreData.length >= 2) {
    for (let ind = 0; ind < genreData.length; ind++) {
      if (genreData[ind] === undefined) { genreData[ind] = ''; } else {
        genreLine += `<span class="film-details__genre">${genreData[ind]}</span>`;}
    }
  } else {genreLine += `<span class="film-details__genre">${genreData[0]}</span>`;}

  return genreLine;
};

const createPopupTemplate = (film) => {
  const {poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, runtime, genre, description} = film;
  const {data, releaseCountry} = film.release;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  const writersLine = writers.join(', ');
  const actorsLine = actors.join(', ');
  const altPoster = title;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="${altPoster}">
        <p class="film-details__age">${ageRating}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writersLine}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actorsLine}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${dateDayMonthYear(data)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${calculateTime(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${genre.length >= 2 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              ${createGenre(genre)}
              </td>
          </tr>
        </table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? ACTIVE_STATE_CLASS : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatched ? ACTIVE_STATE_CLASS : ''}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? ACTIVE_STATE_CLASS : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

    <div class="film-details__bottom-container">

    </div>
  </form>
</section>`;
};

class PopupMovie extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _clickHandler(evt) {
    const idEvent = evt.target.id;

    if (evt.target.className === PopupCardEventOn.CLOSE_BTN) {
      this._callback.clickOnCloseButton();
    }

    switch (idEvent) {
      case PopupCardEventOn.FAVORITE:
        evt.target.classList.toggle('film-details__control-button--active');
        this._callback.clickOnFavorite();
        break;
      case PopupCardEventOn.WATCHED:
        evt.target.classList.toggle('film-details__control-button--active');
        this._callback.clickOnWatched();
        break;
      case PopupCardEventOn.WATCHLIST:
        evt.target.classList.toggle('film-details__control-button--active');
        this._callback.clickOnWatchlist();
        break;
    }
  }

  setClickHandler(type, callback) {
    switch (type) {
      case PopupCardEventOn.CLOSE_BTN:
        this._callback.clickOnCloseButton = callback;
        break;
      case PopupCardEventOn.FAVORITE:
        this._callback.clickOnFavorite = callback;
        break;
      case PopupCardEventOn.WATCHED:
        this._callback.clickOnWatched = callback;
        break;
      case PopupCardEventOn.WATCHLIST:
        this._callback.clickOnWatchlist = callback;
        break;
      default:
        throw Error ('Click handler contain the TYPE which is not detected');
    }
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _keydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._callback.keydownEsc();
    }
  }

  setKeyDownHandler(callback) {
    this._callback.keydownEsc = callback;
    document.addEventListener('keydown', this._keydownHandler);
  }
}

export default PopupMovie;

