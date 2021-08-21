import MovieCardView from '../model/movie-card.js';
import { CardsEventsOn } from '../utils/card-utils.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
import PopupMovieView from '../model/popup-relate-view/popup-movie.js';
import PopupCommentsWrap from '../model/popup-relate-view/popup-comments-wrap.js';
import PopupCommentsTitleView from '../model/popup-relate-view/popup-comments-title.js';
import PopupCommentsListView from '../model/popup-relate-view/popup-comments-list.js';
import PopupCommentsNewView from '../model/popup-relate-view/popup-comments-new.js';

class Movie {
  constructor(movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._bodyPart = document.body;

    this._filmComponent = null;

    this._PopupCommentsWrapComponent = new PopupCommentsWrap();

    this._processClickPopup = this._processClickPopup.bind(this);
    this._processFavoriteClick = this._processFavoriteClick.bind(this);
  }

  init(film, MapObject) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new MovieCardView(this._film);

    if(prevFilmComponent === null) {
      render(this._movieListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      this._setEventListenersThumbnails();
      MapObject.set (this._film.id, this._filmComponent);
      return;
    }

    if(this._movieListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  _processFavoriteClick () {

    // const switcher = !this._film.userDetails.favorite;
    // const getDeepKeys = (obj) => {
    //   for(const key in obj) {
    //     if (key === 'favorite') {
    //       obj[key] = switcher;
    //       break;
    //     }
    //     if(typeof obj[key] === 'object') {
    //       getDeepKeys(obj[key]);
    //     }
    //   }
    // };


    // this._changeData(getDeepKeys(this._film));
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          title: 'HAHAHA I HAVE CHANGED IT',
        },
      ),
    );
  }

  _processClickPopup() {
    this._renderPopup(this._film);
    this._bodyPart.classList.add('hide-overflow');
  }

  _setEventListenersThumbnails() {
    this._filmComponent.setClickHandler(CardsEventsOn.POSTER, this._processClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.TITLE, this._processClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.COMMENTS, this._processClickPopup);

    this._filmComponent.setClickHandler(CardsEventsOn.FAVORITE, this._processFavoriteClick);
    // this._filmComponent.setClickHandler(CardsEventsOn.WATCHED, this._processFavoriteClick);
    // this._filmComponent.setClickHandler(CardsEventsOn.WATCHLIST, this._processFavoriteClick);
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
      remove(popupCommentsTitle);
      remove(popupCommentsList);
      remove(popupCommentsNew);
      this._bodyPart.classList.remove('hide-overflow');
    };

    popupCard.setClickHandler(onClosePopupButton);
  }

  destroy() {
    remove(this._filmComponent);
  }
}

export default Movie;
