import { getYear, calculateTime, CardsEventsOn } from '../utils/card-utils';
import Smart from './smart.js';

const creatCardTemplate = (film) => {
  const {title, totalRating, runtime, genre, poster, description} = film;
  const {date} = film.release;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  const genreLine = genre.join(', ');
  const altPoster = title;

  let descriptionLine = '';
  if (description.length >= 140) {
    descriptionLine += description.slice().substring(0, 139);
    descriptionLine += '...';
  } else {descriptionLine = description;}

  let watchlistClassName = '';
  let historyClassName = '';
  let favoriteClassName = '';

  if (watchlist) {watchlistClassName = 'film-card__controls-item--active';} else {watchlistClassName = '';}
  if (alreadyWatched) {historyClassName = 'film-card__controls-item--active';} else {historyClassName = '';}
  if (favorite) {favoriteClassName = 'film-card__controls-item--active';} else {favoriteClassName = '';}

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${getYear(date)}</span>
    <span class="film-card__duration">${calculateTime(runtime)}</span>
    <span class="film-card__genre">${genreLine}</span>
  </p>
  <img src="${poster}" alt="${altPoster}" class="film-card__poster">
  <p class="film-card__description">${descriptionLine}</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${historyClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

class MovieCard extends Smart{
  constructor (film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate () {
    return creatCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    const classList1 = evt.target.classList[0];
    const classList2 = evt.target.classList[1];
    switch(classList1) {
      case CardsEventsOn.POSTER:
        this._callback.clickOnPoster();
        break;
      case CardsEventsOn.TITLE:
        this._callback.clickOnTitle();
        break;
      case CardsEventsOn.COMMENTS:
        this._callback.clickOnComments();
        break;
    }

    switch(classList2){
      case CardsEventsOn.FAVORITE:
        this._callback.favoriteClick();
        break;
      case CardsEventsOn.WATCHED:
        this._callback.watchedClick();
        break;
      case CardsEventsOn.WATCHLIST:
        this._callback.watchlistClick();
        break;
    }
  }

  setClickHandler (type, callback) {
    switch (type) {
      case CardsEventsOn.POSTER:
        this._callback.clickOnPoster = callback;
        break;
      case CardsEventsOn.TITLE:
        this._callback.clickOnTitle = callback;
        break;
      case CardsEventsOn.COMMENTS:
        this._callback.clickOnComments = callback;
        break;
      case CardsEventsOn.FAVORITE:
        this._callback.favoriteClick = callback;
        break;
      case CardsEventsOn.WATCHED:
        this._callback.watchedClick = callback;
        break;
      case CardsEventsOn.WATCHLIST:
        this._callback.watchlistClick = callback;
        break;
      default:
        throw Error ('Click handler contain the TYPE which is not detected');
    }

    this.getElement().addEventListener('click', this._clickHandler);
  }

  restoreHandlers() {

  }

}

export default MovieCard;
