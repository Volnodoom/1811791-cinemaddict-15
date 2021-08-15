import { dateYear, calculateTime } from '../other/utils';
import AbstractView from './abstract';

const creatCardTemplate = (film) => {
  const {title, totalRating, runtime, genre, poster, description} = film;
  const {data} = film.release;
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
    <span class="film-card__year">${dateYear(data)}</span>
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

class MovieCard extends AbstractView{
  constructor (film) {
    super();
    this._film = film;
    this._clickPosterHandler = this._clickPosterHandler.bind(this);
    this._clickTitleHandler = this._clickTitleHandler.bind(this);
    this._clickCommentsHandler = this._clickCommentsHandler.bind(this);
  }

  getTemplate () {
    return creatCardTemplate(this._film);
  }

  _clickPosterHandler(evt) {
    evt.preventDefault();
    this._callback.clickOnPoster();
  }

  _clickTitleHandler(evt) {
    evt.preventDefault();
    this._callback.clickOnTitle();
  }

  _clickCommentsHandler(evt) {
    evt.preventDefault();
    this._callback.clickOnComments();
  }

  setClickPosterHandler (callback) {
    this._callback.clickOnPoster = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickPosterHandler);
  }

  setClickTitleHandler (callback) {
    this._callback.clickOnTitle = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickTitleHandler);
  }

  setClickCommentsHandler (callback) {
    this._callback.clickOnComments = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click',this._clickCommentsHandler);
  }
}

export default MovieCard;
