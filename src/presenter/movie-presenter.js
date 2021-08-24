import MovieCardView from '../model/movie-card.js';
import { CardsEventsOn } from '../utils/card-utils.js';
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
    this._popupCard = null;
    this._mode = Mode.DEFAULT;

    this._PopupCommentsWrapComponent = new PopupCommentsWrap();

    this._processClickPopup = this._processClickPopup.bind(this);
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
    this._renderPopup(this._film);
    this._bodyPart.classList.add('hide-overflow');
    this._changeMode();
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
    const popupCommentsTitle = new PopupCommentsTitleView(chosenMovie);
    const popupCommentsList = new PopupCommentsListView(chosenMovie);
    const popupCommentsNew = new PopupCommentsNewView();

    render (this._bodyPart, this._popupCard, RenderPosition.BEFOREEND);
    const popupCommentsContainer = this._bodyPart.querySelector('.film-details__bottom-container');

    render (popupCommentsContainer, this._PopupCommentsWrapComponent, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsTitle, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsList, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsNew, RenderPosition.BEFOREEND);


    const onClosePopupButton = () => {
      remove(this._popupCard);
      remove(this._PopupCommentsWrapComponent);
      remove(popupCommentsTitle);
      remove(popupCommentsList);
      remove(popupCommentsNew);
      this._bodyPart.classList.remove('hide-overflow');
    };

    this._popupCard.setClickHandler(onClosePopupButton);
  }

  destroy() {
    remove(this._filmComponent);
  }
}

export default Movie;
