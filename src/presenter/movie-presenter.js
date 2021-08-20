import MovieCardView from '../model/movie-card.js';
import { CardsEventsOn } from '../utils/card-utils.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
// import { updateItem } from '../utils/common.js';
import PopupMovieView from '../model/popup-relate-view/popup-movie.js';
import PopupCommentsWrap from '../model/popup-relate-view/popup-comments-wrap.js';
import PopupCommentsTitleView from '../model/popup-relate-view/popup-comments-title.js';
import PopupCommentsListView from '../model/popup-relate-view/popup-comments-list.js';
import PopupCommentsNewView from '../model/popup-relate-view/popup-comments-new.js';

class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._bodyPart = document.body;

    this._filmComponent = null;

    this._PopupCommentsWrapComponent = new PopupCommentsWrap();

    this._onClickPopup = this._onClickPopup.bind(this);
  }

  init(film, MapObject) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new MovieCardView(this._film);

    if(prevFilmComponent === null) {
      render(this._movieListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      this._setEventListenersThumbnails();
      MapObject.set (this._film.id, this._filmComponent);
      // MapObject.set (this._filmComponent._film.id, this._filmComponent);
      return;
    }

    if(prevFilmComponent.getElement().contains(this)) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  _onClickPopup() {
    this._renderPopup(this._film);
    this._bodyPart.classList.add('hide-overflow');
  }

  _setEventListenersThumbnails() {
    this._filmComponent.setClickHandler(CardsEventsOn.POSTER, this._onClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.TITLE, this._onClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.COMMENTS, this._onClickPopup);
  }

  _renderPopup(chosenMovie) {
    const popupCard = new PopupMovieView(chosenMovie);
    const popupCommentsTitle = new PopupCommentsTitleView(chosenMovie);
    const popupCommentsList = new PopupCommentsListView(chosenMovie);
    const popupCommentsNew = new PopupCommentsNewView();

    render (this._bodyPart, popupCard, RenderPosition.BEFOREEND);
    const popupCommentsContainer = this._bodyPart.querySelector('.film-details__bottom-container');

    render (popupCommentsContainer, this._PopupCommentsWrapComponent, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsTitle, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsList, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsNew, RenderPosition.BEFOREEND);

    const onClosePopupButton = () => {
      remove(popupCard);
      remove(this._PopupCommentsWrapComponent);
      // remove(popupCommentsTitle);
      // remove(popupCommentsList);
      // remove(popupCommentsNew);
      this._bodyPart.classList.remove('hide-overflow');
    };

    popupCard.setClickHandler(onClosePopupButton);
  }

  destroy() {
    remove(this._filmComponent);
  }
}

export default Movie;
