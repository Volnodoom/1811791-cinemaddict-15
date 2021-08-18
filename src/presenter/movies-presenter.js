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

const FILMS_CARDS_PER_STEP = 5;
const TOP_FILMS_COUNT = 2;
const MOST_COMMENTED_COUNT =2;


class MovieBoard {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;

    this._bodyPart = document.body;
    this._sortComponent = new SortView();
    this._boardComponent = new BoardView();
    this._filmListComponent = new FilmListView();
    this._filmConditionMessage = new ConditionMessageBlockView();
    this._filmListContainerMain = new FilmListContainerView();
    this._filmListContainerExtra1 = new FilmListContainerView();
    this._filmListContainerExtra2 = new FilmListContainerView();
    this._boardFilterComponent = new FilterView();
    // this._movieCardComponent = new MovieCardView();
    this._boardButtonShowMore = new ButtonShowMoreView();
    this._extraTopRatingComponent = new TopRatingView();
    this._extraTopCommentedComponent = new TopCommentsView();

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

  _addThumbnailsCardClickHandler (card, film) {
    const callbackForClick = () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    };

    card.setClickHandler(CardsEventsOn.POSTER, callbackForClick);
    card.setClickHandler(CardsEventsOn.TITLE, callbackForClick);
    card.setClickHandler(CardsEventsOn.COMMENTS, callbackForClick);
  }

  _renderMovie(container,film) {
    let cardData = new MovieCardView(film);
    render(container, cardData, RenderPosition.BEFOREEND);
    this._addThumbnailsCardClickHandler(cardData, film);
    cardData.removeElement();
    cardData = '';
  }

  _renderMovies(from, to) {
    this._boardMovies
      .slice(from, to)
      .forEach((boardMovie) => this._renderMovie(this._filmListContainerMain, boardMovie));
  }

  _renderButtonShowMore() {
    let renderFilmsCount = FILMS_CARDS_PER_STEP;
    const loadMoreButtonComponent = this._boardButtonShowMore;

    render(this._filmListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardMovies
        .slice(renderFilmsCount, renderFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((boardMovies) => {this._renderMovie(this._filmListContainerMain, boardMovies);});

      renderFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderFilmsCount >= this._boardMovies.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderTopRating() {
    const renderTopRatingMovie = (index) => {
      const filmsForTopRating = this._boardMovies.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
      let cardData = new MovieCardView(filmsForTopRating[index]);
      render(this._filmListContainerExtra1, cardData,  RenderPosition.BEFOREEND);
      this._addThumbnailsCardClickHandler(cardData, filmsForTopRating[index]);
      cardData.removeElement();
      cardData = '';
    };

    const topRatingComponent =  this._extraTopRatingComponent;
    render(this._boardComponent, topRatingComponent, RenderPosition.BEFOREEND);
    render(topRatingComponent, this._filmListContainerExtra1, RenderPosition.BEFOREEND);
    for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {renderTopRatingMovie (ind);}
  }

  _renderTopCommented() {
    const renderTopCommentedMovies = (index) => {
      const filmForTopCommented = this._boardMovies.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);
      let cardData = new MovieCardView(filmForTopCommented[index]);
      render(this._filmListContainerExtra2, cardData, RenderPosition.BEFOREEND);
      this._addThumbnailsCardClickHandler(cardData, filmForTopCommented[index]);
      cardData.removeElement();
      cardData = '';
    };

    const topCommentsComponent = this._extraTopCommentedComponent;
    render(this._boardComponent, topCommentsComponent, RenderPosition.BEFOREEND);
    render(topCommentsComponent, this._filmListContainerExtra2, RenderPosition.BEFOREEND);
    for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {renderTopCommentedMovies(ind);}
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
