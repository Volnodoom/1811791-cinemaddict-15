import MovieCardView from '../view/movie-card.js';
import { CardsEventsOn, PopupCardEventOn } from '../utils/card-utils.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
import { UpdateType, UserAction } from '../const.js';
import PopupMovieView from '../view/popup-relate-view/popup.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export const State = {
  SAVING: 'SAVING',
  ADDITION: 'ADDITION',
  DELETING: 'DELETING',
  ABORTING_COM_DEL: 'aborting comment deleting',
  ABORTING_COM_UPD: 'aborting comment sending to server',
};

class Movie {
  constructor(movieListContainer, changeData, changeMode, filmsModel) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmsModel = filmsModel;

    this._bodyPart = document.body;

    this._popupComponent = null;
    this._filmComponent = null;

    this._mode = Mode.DEFAULT;

    this._processClickPopup = this._processClickPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._setEventListenersPopup = this._setEventListenersPopup.bind(this);
    this._processFavoriteClick = this._processFavoriteClick.bind(this);
    this._processWatchedClick = this._processWatchedClick.bind(this);
    this._processWatchlistClick = this._processWatchlistClick.bind(this);
    this._processDeleteComments = this._processDeleteComments.bind(this);
    this._processSubmitComment = this._processSubmitComment.bind(this);
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
    //rethink about conditions below:
    if (this._popupComponent) {
      this._closePopup ();
      this._processClickPopup();
    }

    remove(prevFilmComponent);
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    switch (state) {
      // case State.SAVING:
      //   this._filmComponent.updateData({
      //     isSaving: true,
      //   });
      //   break;
      case State.ADDITION:
        this._filmComponent.updateData({
          isSaving: true,
        }, 'true');
        break;
      case State.DELETING:
        this._filmComponent.updateData({
          isDeleting: true,
          isDisabled: true,
        }, 'true');
        break;
      case State.ABORTING_COM_DEL:
        this._popupComponent.setAbortingDeletingComment();
        break;
      case State.ABORTING_COM_UPD:
        this._popupComponent.setAbortingSavingComment(this._filmComponent);
        break;
    }
  }

  _processFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
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
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
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
      UserAction.UPDATE_MOVIE,
      UpdateType.PATCH,
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
  }

  _closePopup() {
    remove(this._popupComponent);

    this._bodyPart.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;

    // this._popupCommentsNew.destroy();
  }

  _processSubmitComment(localComments) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      localComments,
    );
  }

  _processDeleteComments(commentID) {
    return this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      this._film,
      commentID,
    );
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

  resetPopup(filmUpdate) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    this._popupComponent.updateData(filmUpdate);
  }

  _renderPopup(chosenMovie) {
    this._mode = Mode.POPUP;

    this._popupComponent = new PopupMovieView(this._bodyPart, this._changeData, this._changeMode, chosenMovie, this._filmsModel);
    render (this._bodyPart, this._popupComponent, RenderPosition.BEFOREEND);

    this._setEventListenersPopup();
  }

  _setEventListenersPopup() {
    this._popupComponent.setClickPopupHandler(PopupCardEventOn.CLOSE_BTN, this._closePopup);
    this._popupComponent.setClickPopupHandler(PopupCardEventOn.FAVORITE, this._processFavoriteClick);
    this._popupComponent.setClickPopupHandler(PopupCardEventOn.WATCHED, this._processWatchedClick);
    this._popupComponent.setClickPopupHandler(PopupCardEventOn.WATCHLIST, this._processWatchlistClick);
    this._popupComponent.setClickPopupHandler(PopupCardEventOn.DELETE_CMT, this._processDeleteComments);

    this._popupComponent.setKeyDownPopupHandler(PopupCardEventOn.ESC_KEY, this._closePopup);
    this._popupComponent.setKeyDownPopupHandler(PopupCardEventOn.ENTER_KEY, this._processSubmitComment);
  }

  destroy() {
    if (this._filmComponent === null) {
      return;
    }

    remove(this._filmComponent);
    this._filmComponent = null;
  }
}

export default Movie;
