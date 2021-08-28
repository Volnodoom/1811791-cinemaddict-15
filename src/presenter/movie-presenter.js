import MovieCardView from '../model/movie-card.js';
import { CardsEventsOn, PopupCardEventOn } from '../utils/card-utils.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
import PopupMovieView from '../model/popup-relate-view/popup-movie.js';
import PopupCommentsWrap from '../model/popup-relate-view/popup-comments-wrap.js';
import PopupCommentsTitleView from '../model/popup-relate-view/popup-comments-title.js';
import PopupCommentsListView from '../model/popup-relate-view/popup-comments-list.js';
import PopupCommentsNewView from '../model/popup-relate-view/popup-comments-new.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

class Movie {
  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._bodyPart = document.body;

    this._filmComponent = null;

    // this._popupCard = this._popupCard.bind(this);
    // this._popupCommentsTitle = this._popupCommentsTitle.bind(this);
    // this._popupCommentsList = this._popupCommentsList.bind(this);
    // this._popupCommentsNew = this._popupCommentsNew.bind(this);
    // this._PopupCommentsWrapComponent = this._PopupCommentsWrapComponent.bind(this);

    this._mode = Mode.DEFAULT;

    this._processClickPopup = this._processClickPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._setEventListenersPopup = this._setEventListenersPopup.bind(this);
    this._processFavoriteClick = this._processFavoriteClick.bind(this);
    this._processWatchedClick = this._processWatchedClick.bind(this);
    this._processWatchlistClick = this._processWatchlistClick.bind(this);
  }

  initM(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new MovieCardView(this._film);

    if(prevFilmComponent === null) {
      render(this._movieListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      this._setEventListenersThumbnails();
      return;
    }

    if(this._movieListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
      this._setEventListenersThumbnails();
    }

    this._mode = Mode.DEFAULT;
    remove(prevFilmComponent);
  }

  _processFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _processWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            alreadyWatched: !this._film.userDetails.alreadyWatched,
          },
        },
      ),
    );
  }

  _processWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _processClickPopup() {
    this._changeMode();
    this._renderPopup(this._film);
    this._bodyPart.classList.add('hide-overflow');
    this._mode = Mode.POPUP;
  }

  _setEventListenersThumbnails() {
    this._filmComponent.setClickHandler(CardsEventsOn.POSTER, this._processClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.TITLE, this._processClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.COMMENTS, this._processClickPopup);

    this._filmComponent.setClickHandler(CardsEventsOn.FAVORITE,  this._processFavoriteClick);
    this._filmComponent.setClickHandler(CardsEventsOn.WATCHED, this._processWatchedClick);
    this._filmComponent.setClickHandler(CardsEventsOn.WATCHLIST, this._processWatchlistClick);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._popupCard);
      this._mode = Mode.DEFAULT;
    }
  }

  _renderPopup(chosenMovie) {
    this._popupCard = new PopupMovieView(chosenMovie);
    this._popupCommentsTitle = new PopupCommentsTitleView(chosenMovie);
    this._popupCommentsList = new PopupCommentsListView(chosenMovie);
    this._popupCommentsNew = new PopupCommentsNewView();
    this._PopupCommentsWrap = new PopupCommentsWrap();

    render (this._bodyPart, this._popupCard, RenderPosition.BEFOREEND);

    this.popupCommentsContainer = this._bodyPart.querySelector('.film-details__bottom-container');

    render (this.popupCommentsContainer, this._PopupCommentsWrap, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrap, this._popupCommentsTitle, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrap, this._popupCommentsList, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrap, this._popupCommentsNew, RenderPosition.BEFOREEND);

    this._setEventListenersPopup();
  }

  _setEventListenersPopup () {
    this._popupCard.setClickHandler(PopupCardEventOn.CLOSE_BTN, this._closePopup);
    this._popupCard.setClickHandler(PopupCardEventOn.FAVORITE, this._processFavoriteClick);
    this._popupCard.setClickHandler(PopupCardEventOn.WATCHED, this._processWatchedClick);
    this._popupCard.setClickHandler(PopupCardEventOn.WATCHLIST, this._processWatchlistClick);
  }

  _closePopup () {
    remove(this._popupCard);
    remove(this._popupCommentsTitle);
    remove(this._popupCommentsList);
    remove(this._popupCommentsNew);
    this._bodyPart.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this._filmComponent);
  }
}

export default Movie;
