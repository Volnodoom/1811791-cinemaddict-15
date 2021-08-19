/* eslint-disable no-use-before-define */
import BoardView from '../model/board.js';
import ButtonShowMoreView from '../model/button-show-more.js';
import CommentsPopupView from '../model/comments-popup.js';
import ConditionMessageBlockView from '../model/condition-message-block.js';
import TopCommentsView from '../model/extra-comments-cards.js';
import TopRatingView from '../model/extra-top-cards.js';
import FilmListView from '../model/film-list.js';
import FilmListContainerView from '../model/film-list-container.js';
import FilterView from '../model/filters.js';
import MovieCardView from '../model/movie-card.js';
import MoviePopupView from '../model/movie-popup.js';
import SortView from '../model/sort.js';
import { CardsEventsOn } from '../utils/card-utils.js';
import { render, remove, RenderPosition } from '../utils/render.js';
import { FILMS_CARDS_COUNT } from '../main.js';

const FILMS_CARDS_PER_STEP = 5;
const TOP_FILMS_COUNT = 2;
const MOST_COMMENTED_COUNT =2;


class MovieBoard {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;
    this._renderFilmsCount = FILMS_CARDS_PER_STEP;
    this._moviePresenter = new Map();

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

    this._processShowMoreButtonClick = this._processShowMoreButtonClick.bind(this);
  }

  init(boardMovies) {
    this._boardMovies = boardMovies.slice();

    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmConditionMessage, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerMain, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMovie(container,film) {
    const card = new MovieCardView(film);
    render(container, card, RenderPosition.BEFOREEND);

    const onClickPopup = () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    };

    card.setClickHandler(CardsEventsOn.POSTER, onClickPopup);
    card.setClickHandler(CardsEventsOn.TITLE, onClickPopup);
    card.setClickHandler(CardsEventsOn.COMMENTS, onClickPopup);

    this._moviePresenter.set (card._film.id, card);
  }

  _renderMovies(from, to) {
    this._boardMovies
      .slice(from, to)
      .forEach((boardMovie) => this._renderMovie(this._filmListContainerMain, boardMovie));
  }

  _processShowMoreButtonClick() {
    // this._renderMovies(this._renderFilmsCount, this._renderFilmsCount + FILMS_CARDS_PER_STEP);
    // this._renderFilmsCount += FILMS_CARDS_PER_STEP;

    // if (this._renderFilmsCount >= this._boardMovies.length) {
    //   remove(this._boardButtonShowMore);
    this._clearMovieList();
    // }
  }

  _renderButtonShowMore() {
    render(this._filmListComponent, this._boardButtonShowMore, RenderPosition.BEFOREEND);
    this._boardButtonShowMore.setClickHandler(this._processShowMoreButtonClick);
  }

  _renderTopRating() {
    const topRatingComponent =  this._extraTopRatingComponent;
    render(this._boardComponent, topRatingComponent, RenderPosition.BEFOREEND);
    render(topRatingComponent, this._filmListContainerExtra1, RenderPosition.BEFOREEND);

    const filmsForTopRating = this._boardMovies.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
    for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
      this._renderMovie(this._filmListContainerExtra1,filmsForTopRating[ind]);
    }
  }

  _renderTopCommented() {
    const topCommentsComponent = this._extraTopCommentedComponent;
    render(this._boardComponent, topCommentsComponent, RenderPosition.BEFOREEND);
    render(topCommentsComponent, this._filmListContainerExtra2, RenderPosition.BEFOREEND);

    const filmForTopCommented = this._boardMovies.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);

    for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
      this._renderMovie(this._filmListContainerExtra2,filmForTopCommented[ind]);
    }
  }

  _renderPopup (chosenMovie) {
    const popupCard = new MoviePopupView (chosenMovie);
    render (this._bodyPart, popupCard, RenderPosition.BEFOREEND);
    render (this._bodyPart.querySelector('.film-details__comments-title'), new CommentsPopupView(chosenMovie), RenderPosition.BEFOREEND);

    popupCard.setClickHandler(() => {
      remove(popupCard);
      this._bodyPart.classList.remove('hide-overflow');
    });
  }

  _clearMovieList () {
    this._moviePresenter.forEach((movie) => remove(movie));
    this._moviePresenter.clear();
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
    this._renderTopRating();
    this._renderTopCommented();
  }
}

export default MovieBoard;
