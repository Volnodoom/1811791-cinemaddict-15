/* eslint-disable no-use-before-define */
import { render, remove, RenderPosition } from '../utils/render.js';
import BoardView from '../model/board.js';
import ButtonShowMoreView from '../model/button-show-more.js';
import ConditionMessageBlockView from '../model/condition-message-block.js';
import TopCommentsView from '../model/extra-comments-cards.js';
import TopRatingView from '../model/extra-top-cards.js';
import FilmListView from '../model/film-list.js';
import FilmListContainerView from '../model/film-list-container.js';
import FilterView from '../model/filters.js';
import PopupMovieView from '../model/popup-relate-view/popup-movie.js';
import SortView from '../model/sort.js';
import { updateItem } from '../utils/common.js';
import PopupCommentsWrap from '../model/popup-relate-view/popup-comments-wrap.js';
import PopupCommentsTitleView from '../model/popup-relate-view/popup-comments-title.js';
import PopupCommentsListView from '../model/popup-relate-view/popup-comments-list.js';
import PopupCommentsNewView from '../model/popup-relate-view/popup-comments-new.js';
import MoviePresenter from './movie-presenter.js';
import { SortType, sortRating, sortReleaseDate } from '../utils/card-utils.js';

const FILMS_CARDS_PER_STEP = 5;

class MovieBoard {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;
    this._renderFilmsCount = FILMS_CARDS_PER_STEP;
    this._filmPresenterMain = new Map();
    this._filmPresenterTopRating = new Map();
    this._filmPresenterTopCommented = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._bodyPart = document.body;
    this._sortComponent = new SortView();
    this._boardComponent = new BoardView();
    this._filmListComponent = new FilmListView();
    this._filmConditionMessage = new ConditionMessageBlockView();
    this._filmListContainerMain = new FilmListContainerView();
    this._filmListContainerExtra1 = new FilmListContainerView();
    this._filmListContainerExtra2 = new FilmListContainerView();
    this._boardFilterComponent = new FilterView();
    this._boardButtonShowMore = new ButtonShowMoreView();
    this._extraTopRatingComponent = new TopRatingView();
    this._extraTopCommentedComponent = new TopCommentsView();

    this._PopupCommentsWrapComponent = new PopupCommentsWrap();

    this._processShowMoreButtonClick = this._processShowMoreButtonClick.bind(this);
    this._processMovieChange = this._processMovieChange.bind(this);
    this._processModeChange = this._processModeChange.bind(this);
    this._processSortTypeChange = this._processSortTypeChange.bind(this);
  }

  init(boardMovies) {
    this._boardMovies = boardMovies.slice();
    this._sourcedBoardMovies = boardMovies.slice();

    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmConditionMessage, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._processSortTypeChange);
  }

  _renderMovie(container, film) {
    const moviePresenter = new MoviePresenter(container, this._processMovieChange, this._processModeChange);
    moviePresenter.initM(film);
    this._filmPresenterMain.set(film.id, moviePresenter);
  }

  _renderMovies(from, to) {
    this._boardMovies
      .slice(from, to)
      .forEach((boardMovie) => this._renderMovie(this._filmListContainerMain, boardMovie, this._filmPresenterMain));
  }

  _processShowMoreButtonClick() {
    this._renderMovies(this._renderFilmsCount, this._renderFilmsCount + FILMS_CARDS_PER_STEP);
    this._renderFilmsCount += FILMS_CARDS_PER_STEP;

    if (this._renderFilmsCount >= this._boardMovies.length) {
      remove(this._boardButtonShowMore);
    }
  }

  _processMovieChange(whatWeWantToChangeInMovie) {
    this._boardMovies = updateItem(this._boardMovies, whatWeWantToChangeInMovie);
    this._sourcedBoardMovies = updateItem(this._sourcedBoardMovies, whatWeWantToChangeInMovie);
    this._filmPresenterMain.get(whatWeWantToChangeInMovie.id).initM(whatWeWantToChangeInMovie);
  }

  _processModeChange() {
    this._filmPresenterMain.forEach((presenter) => presenter.resetView());
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._boardMovies.sort(sortRating);
        break;
      case SortType.DATE:
        this._boardMovies.sort(sortReleaseDate);
        break;
      default:
        this._boardMovies = this._sourcedBoardMovies.slice();
    }
    this._currentSortType = SortType;
  }

  _processSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }

    this._sortMovies(sortType);
    this._clearMovieList();
    this._renderMovieList();
  }

  _renderButtonShowMore() {
    render(this._filmListComponent, this._boardButtonShowMore, RenderPosition.BEFOREEND);
    this._boardButtonShowMore.setClickHandler(this._processShowMoreButtonClick);
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


  _renderPopup(chosenMovie) {
    const popupCard = new PopupMovieView(chosenMovie);
    const popupCommentsTitle = new PopupCommentsTitleView(chosenMovie);
    const popupCommentsList = new PopupCommentsListView(chosenMovie);
    const popupCommentsNew = new PopupCommentsNewView();

    render (this._bodyPart, popupCard, RenderPosition.BEFOREEND);
    render (this._bodyPart.querySelector('.film-details__bottom-container'), this._PopupCommentsWrapComponent, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsTitle, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsList, RenderPosition.BEFOREEND);
    render (this._PopupCommentsWrapComponent, popupCommentsNew, RenderPosition.BEFOREEND);


    popupCard.setClickHandler(() => {
      remove(popupCard);
      remove(this._PopupCommentsWrapComponent);
      remove(popupCommentsTitle);
      remove(popupCommentsList);
      remove(popupCommentsNew);
      this._bodyPart.classList.remove('hide-overflow');
    });
  }

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

  _renderBoard() {
    this._renderMovieList();
    // this._renderTopRating();
    // this._renderTopCommented();
  }
}

export default MovieBoard;
