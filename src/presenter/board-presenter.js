/* eslint-disable no-use-before-define */
import { render, remove, RenderPosition } from '../utils/render.js';
import BoardView from '../view/board.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import ConditionMessageBlockView from '../view/condition-message-block.js';
import TopCommentsView from '../view/extra-comments-cards.js';
import TopRatingView from '../view/extra-top-cards.js';
import FilmListView from '../view/film-list.js';
import FilmListContainerView from '../view/film-list-container.js';
import FilterView from '../view/filters.js';
// import PopupMovieView fro../view/popup-relate-view/popup-movie.js';
import SortView from '../view/sort.js';
import PopupCommentsWrap from '../view/popup-relate-view/popup-comments-wrap.js';
// import PopupCommentsTitleView fro../view/popup-relate-view/popup-comments-title.js';
// import PopupCommentsListView fro../view/popup-relate-view/popup-comments-list.js';
// import PopupCommentsNewView fro../view/popup-relate-view/popup-comments-new.js';
import MoviePresenter from './movie-presenter.js';
import { SortType, sortRating, sortReleaseDate } from '../utils/card-utils.js';
import { UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter-utils.js';

const FILMS_CARDS_PER_STEP = 5;

class MovieBoard {
  constructor (boardContainer, model, filterModel) {
    this._filmsModel = model;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_CARDS_PER_STEP;
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
    this._filterModel.addObserver(this._processModelEvent);
  }

  init() {
    // this._renderSort();

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

    render(this._boardContainer, this._sortComponent, RenderPosition.AFTER_ELEMENT);
  }

  _processSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedMovieCount: true});
    this._renderBoard();
  }

  _renderMovie(film) {
    const moviePresenter = new MoviePresenter(this._filmListContainerMain, this._processViewAction, this._processModeChange);
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
    this._boardButtonShowMoreComponent.setClickHandler(this._processShowMoreButtonClick);
    render(this._filmListComponent, this._boardButtonShowMoreComponent, RenderPosition.BEFOREEND);
  }

  _processShowMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderFilmsCount = Math.min(movieCount, this._renderedFilmCount + FILMS_CARDS_PER_STEP);
    const films = this._getMovies().slice(this._renderedFilmCount, newRenderFilmsCount);

    this._renderMovies(films);
    this._renderedFilmCount = newRenderFilmsCount;

    if (this._renderedFilmCount >= movieCount) {
      remove(this._boardButtonShowMoreComponent);
    }
  }

  _processViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._filmsModel.updateMovie(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
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

  _clearBoard({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const filmCount = this._getMovies().length;

    this._filmPresenterMain.forEach((presenter) => presenter.destroy());
    this._filmPresenterMain.clear();

    remove(this._sortComponent);
    remove(this._boardButtonShowMoreComponent);

    if (resetRenderedMovieCount) {
      this._renderedFilmCount = FILMS_CARDS_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const films = this._getMovies();
    const filmCount = films.length;

    // if (filmCount === 0) {
    //   additing conditions when there are no movies to show
    // }

    this._renderSort();
    this._renderMovies(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderButtonShowMore();
    }

    // this._renderTopRating();
    // this._renderTopCommented();
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getMovies();
    const filteredMovies = filter[filterType](films);


    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortReleaseDate);
      case SortType.RATING:
        return filteredMovies.sort(sortRating);
      default:
        return filteredMovies;
    }
  }

}

export default MovieBoard;
