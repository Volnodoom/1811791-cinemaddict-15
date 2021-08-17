/* eslint-disable no-use-before-define */
import AvatarView from '../model/avatar';
import ButtonShowMoreView from '../model/button-show-more';
import CardsContainerView from '../model/cards-container';
import CommentsPopupView from '../model/comments-popup';
import TopCommentsView from '../model/extra-comments-cards';
import TopCardsView from '../model/extra-top-cards';
import FilterView from '../model/filters';
import FooterView from '../model/footer';
import MovieCardView from '../model/movie-card.js';
import MoviePopupView from '../model/movie-popup';
import SortView from '../model/sort';
import { render, remove, RenderPosition, FooterCondition } from '../utils/render.js';
import { CardsEventsOn } from '../utils/card-utils';

const FILMS_CARDS_PER_STEP = 5;
const TOP_FILMS_COUNT = 2;
const MOST_COMMENTED_COUNT =2;

class MovieBoard {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;
    this._bodyPart = document.body;


    this._boardFilterComponent = new FilterView();
    this._boardMovieCardComponent = new MovieCardView();
    this._boardButtonShowMore = new ButtonShowMoreView();
  }

  init(boardMovies) {
    this._boardMovies = boardMovies.slice();

  }

  _renderBasisForBoardMovies() {
    const footerPart = this._bodyPart.querySelector('.footer__statistics');
    const headerOfBody = this._bodyPart.querySelector('.header');
    const mainOfBody = this._bodyPart.querySelector('.main');

    render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
    render(mainOfBody, new SortView(), RenderPosition.BEFOREEND);
    render(mainOfBody, new CardsContainerView(), RenderPosition.BEFOREEND);
    render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);
  }

  _renderSort() {

  }

  _addThumbnailsCardClickHandler (card, film) {
    card.setClickHandler(CardsEventsOn.POSTER, () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    });
    card.setClickHandler(CardsEventsOn.TITLE, () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    });
    card.setClickHandler(CardsEventsOn.COMMENTS, () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    });
  }

  _renderMovie(film) {
    const mainOfBody = this._bodyPart.querySelector('.main');
    const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

    const renderCard = () => {
      let cardData = this._boardMovieCardComponent;
      render(containerDivInMovies, cardData, RenderPosition.BEFOREEND);
      this._addThumbnailsCardClickHandler(cardData, film);
      cardData.removeElement();
      cardData = '';
    };

    renderCard();
  }

  _renderMovies(from, to) {
    this._boardMovies
      .slice(from, to)
      .forEach((boardMovie) => this._renderMovie(boardMovie));
  }

  _renderButtonShowMore() {
    let renderFilmsCount = FILMS_CARDS_PER_STEP;

    const mainOfBody = this._bodyPart.querySelector('.main');
    const placeForButtonElement = mainOfBody.querySelector('.films-list');
    const loadMoreButtonComponent = new ButtonShowMoreView();

    render(placeForButtonElement, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardMovies
        .slice(renderFilmsCount, renderFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((boardMovies) => {this._renderMovie(boardMovies);});

      renderFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderFilmsCount >= this._boardMovies.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderTopMovies() {

  }

  _renderTopComments() {

  }

  _renderExtraMovies() {
    const mainOfBody = this._bodyPart.querySelector('.main');
    const sectionMovies = mainOfBody.querySelector('.films');

    const renderTopRating = (index) => {
      const filmsForTopRating = this._boardMovies.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
      let cardData = new MovieCardView(filmsForTopRating[index]);
      render(containerForMovieCards[1], cardData,  RenderPosition.BEFOREEND);
      this._addThumbnailsCardClickHandler(cardData, filmsForTopRating[index]);
      cardData.removeElement();
      cardData = '';
    };

    const renderTopCommented = (index) => {
      const filmForTopCommented = this._boardMovies.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);
      let cardData = new MovieCardView(filmForTopCommented[index]);
      render(containerForMovieCards[2], cardData, RenderPosition.BEFOREEND);
      this._addThumbnailsCardClickHandler(cardData, filmForTopCommented[index]);
      cardData.removeElement();
      cardData = '';
    };

    render(sectionMovies, new TopCardsView(), RenderPosition.BEFOREEND);
    render(sectionMovies, new TopCommentsView(), RenderPosition.BEFOREEND);

    const containerForMovieCards = mainOfBody.querySelectorAll('.films-list__container');

    // ----> for TOP and MostCommented movies
    for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {renderTopRating (ind);}
    for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {renderTopCommented(ind);}

  }

  _renderPopup (chosenMovie) {
    const MoviePopupChosen = new MoviePopupView (chosenMovie);
    render (this._bodyPart, MoviePopupChosen, RenderPosition.BEFOREEND);
    render (this._bodyPart.querySelector('.film-details__comments-title'), new CommentsPopupView(chosenMovie), RenderPosition.BEFOREEND);

    MoviePopupChosen.setClickHandler(() => {
      remove(MoviePopupChosen);
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
    this._renderSort();
    this._renderMovieList();
  }
}

export default MovieBoard;
