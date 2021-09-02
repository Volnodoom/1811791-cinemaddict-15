/* eslint-disable no-use-before-define */
import { render, remove, RenderPosition } from '../utils/render.js';
import BoardView from '../view/board.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import ConditionMessageBlockView from '../view/condition-message-block.js';
import TopCommentsView from '../view/extra-comments-cards.js.js';
import TopRatingView from '../view/extra-top-cards.js.js';
import FilmListView from '../view/film-list.js.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilterView from '../view/filters.js.js';
// import PopupMovieView fro../view/popup-relate-view/popup-movie.js.js.js';
import SortView from '../view/sort.js';
import PopupCommentsWrap from '../view/popup-relate-view/popup-comments-wrap.js.js';
// import PopupCommentsTitleView fro../view/popup-relate-view/popup-comments-title.js.js.js';
// import PopupCommentsListView fro../view/popup-relate-view/popup-comments-list.js.js';
// import PopupCommentsNewView fro../view/popup-relate-view/popup-comments-new.js.js.js';
import MoviePresenter from './movie-presenter.js';
import { SortType, sortRating, sortReleaseDate } from '../utils/card-utils.js';
import { UpdateType, UserAction } from '../const.js';


const FILMS_CARDS_PER_STEP = 5;

class MovieBoard {
  constructor (boardContainer, model) {
    this._filmsModel = model;
    this._boardContainer = boardContainer;
    this._renderFilmsCount = FILMS_CARDS_PER_STEP;
    this._filmPresenterMain = new Map();
    this._filmPresenterTopRating = new Map();
    this._filmPresenterTopCommented = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._boardButtonShowMoreComponent = null;

    this._bodyPart = document.body;
    this._boardComponent = new BoardView();
    this._filmListComponent = new FilmListView();
    this._filmConditionMessage = new ConditionMessageBlockView();
    this._filmListContainerMain = new FilmListContainerView();
    this._filmListContainerExtra1 = new FilmListContainerView();
    this._filmListContainerExtra2 = new FilmListContainerView();
    this._boardFilterComponent = new FilterView();
    this._extraTopRatingComponent = new TopRatingView();
    this._extraTopCommentedComponent = new TopCommentsView();

    this._PopupCommentsWrapComponent = new PopupCommentsWrap();

    this._processShowMoreButtonClick = this._processShowMoreButtonClick.bind(this);
    this._processViewAction = this._processViewAction.bind(this);
    this._processModelEvent = this._processModelEvent.bind(this);
    this._processModeChange = this._processModeChange.bind(this);
    this._processSortTypeChange = this._processSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._processModelEvent);
  }

  init() {
    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmConditionMessage, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !==null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._processSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _processSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedMovieCount: true});
    this._renderBoard();
  }

  _renderMovie(container, film) {
    const moviePresenter = new MoviePresenter(container, this._processViewAction, this._processModeChange);
    moviePresenter.initM(film);
    this._filmPresenterMain.set(film.id, moviePresenter);
  }

  _renderMovies(films) {
    films.forEach((film) => this._renderMovie(film));
  }

  _renderButtonShowMore() {
    if (this._boardButtonShowMoreComponent !==null) {
      this._boardButtonShowMoreComponent = null;
    }

    this._boardButtonShowMoreComponent = new ButtonShowMoreView();
    this._boardButtonShowMore.setClickHandler(this._processShowMoreButtonClick);
    render(this._filmListComponent, this._boardButtonShowMoreComponent, RenderPosition.BEFOREEND);
  }

  _processShowMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderFilmsCount = Math.min(movieCount, this._renderFilmsCount + FILMS_CARDS_PER_STEP);
    const movies = this._getMovies().slice(this._renderFilmsCount, newRenderFilmsCount);

    this._renderMovies(movies);
    this._renderFilmsCount = newRenderFilmsCount;

    if (movieCount >= FILMS_CARDS_PER_STEP) {
      remove(this._boardButtonShowMore);
    }
  }

  _processViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._filmsModel.updateMovie(updateType, update);
        break;

    }

  }

  _processModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._filmPresenterMain.get(data.id).initM(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedMovieCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _processModeChange() {
    this._filmPresenterMain.forEach((presenter) => presenter.resetView());
  }


  // _renderTopRating() {
  //   const topRatingComponent =  this._extraTopRatingComponent;
  //   render(this._boardComponent, topRatingComponent, RenderPosition.BEFOREEND);
  //   render(topRatingComponent, this._filmListContainerExtra1, RenderPosition.BEFOREEND);

  //   const filmsForTopRating = this._boardMovies.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
  //   for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
  //     this._renderMovie(this._filmListContainerExtra1,filmsForTopRating[ind], this._filmPresenterTopRating);
  //   }
  // }

  // _renderTopCommented() {
  //   const topCommentsComponent = this._extraTopCommentedComponent;
  //   render(this._boardComponent, topCommentsComponent, RenderPosition.BEFOREEND);
  //   render(topCommentsComponent, this._filmListContainerExtra2, RenderPosition.BEFOREEND);

  //   const filmForTopCommented = this._boardMovies.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);

  //   for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
  //     this._renderMovie(this._filmListContainerExtra2,filmForTopCommented[ind], this._filmPresenterTopCommented);
  //   }
  // }


  // _renderPopup(chosenMovie) {
  //   const popupCard = new PopupMovieView(chosenMovie);
  //   const popupCommentsTitle = new PopupCommentsTitleView(chosenMovie);
  //   const popupCommentsList = new PopupCommentsListView(chosenMovie);
  //   const popupCommentsNew = new PopupCommentsNewView();

  //   render (this._bodyPart, popupCard, RenderPosition.BEFOREEND);
  //   render (this._bodyPart.querySelector('.film-details__bottom-container'), this._PopupCommentsWrapComponent, RenderPosition.BEFOREEND);
  //   render (this._PopupCommentsWrapComponent, popupCommentsTitle, RenderPosition.BEFOREEND);
  //   render (this._PopupCommentsWrapComponent, popupCommentsList, RenderPosition.BEFOREEND);
  //   render (this._PopupCommentsWrapComponent, popupCommentsNew, RenderPosition.BEFOREEND);


  //   popupCard.setClickHandler(() => {
  //     remove(popupCard);
  //     remove(this._PopupCommentsWrapComponent);
  //     remove(popupCommentsTitle);
  //     remove(popupCommentsList);
  //     remove(popupCommentsNew);
  //     this._bodyPart.classList.remove('hide-overflow');
  //   });
  // }

  _clearMovieList() {
    const clearMapDOM = (MapObject) => {
      MapObject.forEach((movie) => movie.destroy());
      MapObject.clear();
    };

    clearMapDOM(this._filmPresenterMain);
    clearMapDOM(this._filmPresenterTopRating);
    clearMapDOM(this._filmPresenterTopCommented);
    this._renderFilmsCount = FILMS_CARDS_PER_STEP;
    remove(this._boardButtonShowMore);
  }

  _renderMovieList() {
    this._renderMovies (0, Math.min(this._boardMovies.length, FILMS_CARDS_PER_STEP));

    if (this._boardMovies.length > FILMS_CARDS_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _clearBoard({resetRenderedMovieCount = false, resetSortType = false} = {}) {

  }

  _renderBoard() {
    this._renderMovieList();
    // this._renderTopRating();
    // this._renderTopCommented();
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getMovies().slice().sort(sortReleaseDate);
      case SortType.RATING:
        return this._filmsModel.getMovies().slice().sort(sortRating);
      default:
        return this._filmsModel.getMovies();
    }
  }

}

export default MovieBoard;
