/* eslint-disable no-use-before-define */
import { render, remove, RenderPosition } from '../utils/render.js';
import BoardView from '../view/board.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import ConditionMessageBlockView from '../view/condition-message-block.js';
import TopCommentsView from '../view/extra-comments-cards.js';
import TopRatingView from '../view/extra-top-cards.js';
import FilmListView from '../view/film-list.js';
import FilmListContainerView from '../view/film-list-container.js';
import SortView from '../view/sort.js';
import MoviePresenter, {State as MoviePresenterViewState} from './movie-presenter.js';
import { SortType, sortRating, sortReleaseDate } from '../utils/card-utils.js';
import { FilterType, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter-utils.js';
import NoMovieView from '../view/no-movie.js';
import ExtraTopRatingWrap from '../view/extra-top-cards.js';
import ExtraTopCommentsWrap from '../view/extra-comments-cards.js';

const FILMS_CARDS_PER_STEP = 5;

class MovieBoard {
  constructor (boardContainer, model, filterModel, api) {
    this._filmsModel = model;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_CARDS_PER_STEP;
    this._filmPresenterMain = new Map();
    this._filmPresenterExtra1 = new Map();
    this._filmPresenterExtra2 = new Map();
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._boardButtonShowMoreComponent = null;
    this._noMovieComponent = null;

    this._bodyPart = document.body;
    this._boardComponent = new BoardView();
    this._filmListComponent = new FilmListView();
    this._filmConditionMessage = new ConditionMessageBlockView();
    this._filmListContainerMain = new FilmListContainerView();
    this._filmListContainerExtraTopRating = new FilmListContainerView();
    this._filmListContainerExtraTopComment = new FilmListContainerView();
    this._extraTopRatingComponent = new TopRatingView();
    this._extraTopCommentedComponent = new TopCommentsView();

    this._loadingComponent = new NoMovieView(FilterType.LOADING);

    this._processShowMoreButtonClick = this._processShowMoreButtonClick.bind(this);
    this._processViewAction = this._processViewAction.bind(this);
    this._processModelEvent = this._processModelEvent.bind(this);
    this._processModeChange = this._processModeChange.bind(this);
    this._processSortTypeChange = this._processSortTypeChange.bind(this);
  }

  init() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmConditionMessage, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerMain, RenderPosition.BEFOREEND);

    this._filmsModel.addObserver(this._processModelEvent);
    this._filterModel.addObserver(this._processModelEvent);

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

  _renderMovie(film, container) {
    const moviePresenter = new MoviePresenter(container, this._processViewAction, this._processModeChange);
    moviePresenter.initM(film);
    switch (false) {
      case this._filmPresenterMain.has(`${film.id}`):
        this._filmPresenterMain.set(film.id, moviePresenter);
        break;
      case this._filmPresenterExtra1.has(`${film.id}`):
        this._filmPresenterExtra1.set(film.id, moviePresenter);
        break;
      case this._filmPresenterExtra2.has(`${film.id}`):
        this._filmPresenterExtra2.set(film.id, moviePresenter);
        break;
    }
  }

  _renderMovies(films) {
    films.forEach((film) => this._renderMovie(film, this._filmListContainerMain));
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

  _processViewAction(actionType, updateType, update, commentId = null) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        // this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        this._api.updateMovie(update)
          .then((response) => {
            this._filmsModel.updateMovie(updateType, response);
          })
          .catch(() => {
            this._filmPresenterMain.get(update.id).shake(()=>{});
          });
        break;
      case UserAction.ADD_COMMENT:
        this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.ADDITION);
        this._api.addComment(update)
          .then((response) => {
            this._filmsModel.updateMovie(updateType, response);
          })
          .catch(() => {
            this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.ABORTING_COM_UPD);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.DELETING);
        this._api.deleteComment(commentId)
          .then(() => {
            this._filmsModel.deleteComments(updateType, update, commentId);
          })
          .catch(() => {
            this._filmPresenterMain.get(update.id).setViewState(MoviePresenterViewState.ABORTING_COM_DEL);
          });
        break;
    }
  }

  _refreshLinesContent(film) {
    if(this._filmPresenterMain.has(`${film.id}`)) {
      this._filmPresenterMain.get(film.id).initM(film);
    }
    if(this._filmPresenterExtra1.has(`${film.id}`)) {
      this._filmPresenterExtra1.get(film.id).initM(film);
    }
    if(this._filmPresenterExtra2.has(`${film.id}`)) {
      this._filmPresenterExtra2.get(film.id).initM(film);
    }
  }

  _refreshPopupContent(film) {
    if(this._filmPresenterMain.has(`${film.id}`)) {
      this._filmPresenterMain.get(film.id).resetPopup(film);
    }
    if(this._filmPresenterExtra1.has(`${film.id}`)) {
      this._filmPresenterExtra1.get(film.id).resetPopup(film);
    }
    if(this._filmPresenterExtra2.has(`${film.id}`)) {
      this._filmPresenterExtra2.get(film.id).resetPopup(film);
    }
  }

  _processModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._refreshLinesContent(data);
        break;
      case UpdateType.MINOR:
        this._refreshPopupContent(data);
        this._refreshLinesContent(data);
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedMovieCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _processModeChange() {
    this._filmPresenterMain.forEach((presenter) => presenter.resetView());
    this._filmPresenterExtra1.forEach((presenter) => presenter.resetView());
    this._filmPresenterExtra2.forEach((presenter) => presenter.resetView());
  }

  _renderExtraTopRating(films) {
    const topRatingMovies = films.slice().sort((aInd, bInd) => bInd.totalRating - aInd.totalRating);

    if (topRatingMovies[0].totalRating === 0 ) {
      return;
    }

    this._extraTopRatingWrap =  new ExtraTopRatingWrap();

    this._renderMovie(topRatingMovies[0], this._filmListContainerExtraTopRating);
    this._renderMovie(topRatingMovies[1], this._filmListContainerExtraTopRating);

    render(this._boardComponent, this._extraTopRatingWrap, RenderPosition.BEFOREEND);
    render(this._extraTopRatingWrap, this._filmListContainerExtraTopRating, RenderPosition.BEFOREEND);
  }

  _renderExtraTopCommented(films) {
    const topCommentedMovies = films.slice().sort((aInd, bInd) => bInd.comments.length - aInd.comments.length);

    if (topCommentedMovies[0].comments.length === 0 ) {
      return;
    }

    this._extraTopCommentedWrap =  new ExtraTopCommentsWrap();

    this._renderMovie(topCommentedMovies[0], this._filmListContainerExtraTopComment);
    this._renderMovie(topCommentedMovies[1], this._filmListContainerExtraTopComment);

    render(this._boardComponent, this._extraTopCommentedWrap, RenderPosition.BEFOREEND);
    render(this._extraTopCommentedWrap, this._filmListContainerExtraTopComment, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const filmCount = this._getMovies().length;

    this._filmPresenterMain.forEach((presenter) => presenter.destroy());
    this._filmPresenterMain.clear();
    this._filmPresenterExtra1.forEach((presenter) => presenter.destroy());
    this._filmPresenterExtra1.clear();
    this._filmPresenterExtra2.forEach((presenter) => presenter.destroy());
    this._filmPresenterExtra2.clear();

    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._boardButtonShowMoreComponent);
    remove(this._extraTopRatingWrap);
    remove(this._extraTopCommentedWrap);

    if (this._noMovieComponent) {
      remove(this._noMovieComponent);
    }

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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getMovies();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoMovies();
      return;
    }

    this._renderSort();
    this._renderMovies(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderButtonShowMore();
    }

    this._renderExtraTopRating(films);
    this._renderExtraTopCommented(films);
  }

  _getMovies() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getMovies();
    const filteredMovies = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortReleaseDate);
      case SortType.RATING:
        return filteredMovies.sort(sortRating);
      default:
        return filteredMovies;
    }
  }

  _renderNoMovies() {
    this._noMovieComponent = new NoMovieView (this._filterType);
    render(this._boardContainer, this._noMovieComponent, RenderPosition.AFTER_ELEMENT);
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.AFTER_ELEMENT);
  }

  destroy() {
    this._clearBoard({resetRenderedMovieCount: true, resetSortType: true});

    remove(this._boardComponent);
    remove(this._filmListComponent);
    remove(this._filmConditionMessage);
    remove(this._filmListContainerMain);

    this._filmsModel.removeObserver(this._processModelEvent);
    this._filterModel.removeObserver(this._processModelEvent);
  }
}

export default MovieBoard;
