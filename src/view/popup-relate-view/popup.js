import { MILLISECONDS, SHAKE_ANIMATION_TIMEOUT } from '../../const.js';
import { calculateTime, getDayMonthYear, EmojiContent, PopupCardEventOn } from '../../utils/card-utils.js';
import Smart from '../smart.js';
import { createCommentListHtmlLine } from './comment-list-template.js';
import he from 'he';

const ACTIVE_STATE_CLASS = 'film-details__control-button--active';

const createGenreHtmlLine = (genreList) => genreList.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ');
const createEmojiCommentHtmlLine = ({idEmj, valueEmj, imgUrlEmj}) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="${idEmj}" value="${valueEmj}">
<label class="film-details__emoji-label" for="${idEmj}">
  <img src="${imgUrlEmj}" width="30" height="30" alt="${idEmj}">
</label>`;

const createPopupTemplate = (film) => {
  const {
    poster,
    ageRating,
    title,
    alternativeTitle,
    totalRating,
    director,
    writers,
    actors,
    runtime,
    genre,
    description,
    isSaving,
  } = film;

  const {
    data,
    releaseCountry,
  } = film.release;

  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = film.userDetails;

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
              <td class="film-details__cell">${getDayMonthYear(data)}</td>
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
                ${createGenreHtmlLine(genre)}
            </tr>
          </table>

          <p class="film-details__film-description">${description} </p>

        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? ACTIVE_STATE_CLASS : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatched ? ACTIVE_STATE_CLASS : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? ACTIVE_STATE_CLASS : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        ${createCommentListHtmlLine(film)}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" required ${isSaving ? 'disabled' : ''}></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${createEmojiCommentHtmlLine(EmojiContent.SMILE)}
            ${createEmojiCommentHtmlLine(EmojiContent.SLEEPING)}
            ${createEmojiCommentHtmlLine(EmojiContent.PUKE)}
            ${createEmojiCommentHtmlLine(EmojiContent.ANGRY)}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupMovieView extends Smart {
  constructor(filmContainer, changeData, changeMode, film, filmsModel) {
    super();
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmsModel = filmsModel;
    this._film = film;

    // this._deleteButton = null;
    this._deletedCommentId = null;

    this._clickPopupHandler = this._clickPopupHandler.bind(this);
    this._keydownPopupHandler = this._keydownPopupHandler.bind(this);
    this._innerClickHandler = this._innerClickHandler.bind(this);
    this._innerInputHandler = this._innerInputHandler.bind(this);

    this._setInnerHandler();

    this._localCommentUpdate = {
      localComments: '',
      localEmoji: '',
    };
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _clickPopupHandler(evt) {
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

    switch (evt.target.className) {
      case PopupCardEventOn.DELETE_CMT:
        this._deleteButton = evt.target;

        this._index = this._film.comments.findIndex((line) => line.commentItself === evt.target.parentElement.previousElementSibling.textContent);
        this._deletedCommentId = this._film.comments[this._index].id;

        this._deleteButton.innerText = 'Deleting...';
        this._deleteButton.disabled = true;

        this._callback.clickOnDeleteCommentButton(this._deletedCommentId);
        break;
    }
  }

  setClickPopupHandler(type, callback) {
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
      case PopupCardEventOn.DELETE_CMT:
        this._callback.clickOnDeleteCommentButton = callback;
        break;
      default:
        throw Error ('Click handler contain the TYPE which is not detected');
    }
    this.getElement().addEventListener('click', this._clickPopupHandler);
  }

  _keydownPopupHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._callback.keydownEsc();
    }
    if (evt.ctrlKey && (evt.key === 'Enter' || evt.key === 'Enter')) {
      evt.preventDefault();

      if (this._localCommentUpdate.localComments === undefined ) {
        return;
      }
      this._callback.formSubmit(
        Object.assign(
          {},
          this._film,
          this._localCommentUpdate,
        ),
      );

      delete this._localCommentUpdate.localComments;
      delete this._localCommentUpdate.localEmoji;
    }
  }

  setKeyDownPopupHandler(type, callback) {
    switch (type) {
      case PopupCardEventOn.ESC_KEY:
        this._callback.keydownEsc = callback;
        break;
      case PopupCardEventOn.ENTER_KEY:
        this._callback.formSubmit = callback;
    }

    document.addEventListener('keydown', this._keydownPopupHandler);
  }

  _innerClickHandler(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.target.parentElement.previousElementSibling.checked = 'true';
      this.getElement().querySelector('.film-details__add-emoji-label')
        .innerHTML =`<img src="${evt.target.attributes[0].value}" width="55" height="55" alt="emoji-smile"></img>`;

      this._localCommentUpdate.localEmoji = evt.target.parentElement.previousElementSibling.value;
    }
  }

  _innerInputHandler (evt) {
    if (evt.target.tagName === 'TEXTAREA') {
      this._localCommentUpdate.localComments = he.encode(evt.target.value);
    }
  }

  _setInnerHandler() {
    this.getElement().querySelector('.film-details__new-comment').addEventListener('click', this._innerClickHandler);
    this.getElement().querySelector('.film-details__new-comment').addEventListener('input', this._innerInputHandler);
  }

  restoreHandlers() {
    this.setClickPopupHandler(PopupCardEventOn.CLOSE_BTN, this._callback.clickOnCloseButton);
    this.setClickPopupHandler(PopupCardEventOn.FAVORITE, this._callback.clickOnFavorite);
    this.setClickPopupHandler(PopupCardEventOn.WATCHED, this._callback.clickOnWatched);
    this.setClickPopupHandler(PopupCardEventOn.WATCHLIST, this._callback.clickOnWatchlist);
    this.setClickPopupHandler(PopupCardEventOn.DELETE_CMT, this._callback.clickOnDeleteCommentButton);

    this.setKeyDownPopupHandler(PopupCardEventOn.ESC_KEY, this._callback.keydownEsc);
    this.setKeyDownPopupHandler(PopupCardEventOn.ENTER_KEY, this._callback.formSubmit);

    this._setInnerHandler();
  }

  cleanLocalComment() {
    this._localCommentUpdate = {};
  }

  setAbortingDeletingComment() {
    this._deleteButton.innerText = 'Delete';
    this._deleteButton.disabled = false;

    this._deleteButton.closest('li').style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MILLISECONDS}s`;
    setTimeout(() => {
      this._deleteButton.closest('li').style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setAbortingSavingComment(presenter) {
    presenter.updateData({
      isSaving: false,
    }, 'true');


    this.getElement().querySelector('.film-details__bottom-container')
      .style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MILLISECONDS}s`;
    setTimeout(() => {
      this.getElement().querySelector('.film-details__bottom-container')
        .style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setSavingComment() {
    this.getElement().updateData({
      isSaving: true,
    }, true);
  }
}

