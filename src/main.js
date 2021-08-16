/* eslint-disable no-use-before-define */
import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
import AvatarView from './model/avatar';
import ButtonShowMoreView from './model/button-show-more';
import CardsContainerView from './model/cards-container';
import CommentsPopupView from './model/comments-popup';
import EmptyConditionView from './model/empty-condition';
import TopCommentsView from './model/extra-comments-cards';
import TopCardsView from './model/extra-top-cards';
import FilterView from './model/filters';
import FooterView from './model/footer';
import MovieCardView from './model/movie-card.js';
import MoviePopupView from './model/movie-popup';
import SortView from './model/sort';
import { CardsEventsOn } from './utils/card-utils';
import { render, remove, RenderPosition, EmptyStatement, FooterCondition } from './utils/render.js';

const FILMS_CARDS_COUNT = 20;
const FILMS_CARDS_PER_STEP = 5;
const TOP_FILMS_COUNT = 2;
const MOST_COMMENTED_COUNT =2;

const films = new Array (FILMS_CARDS_COUNT).fill(' ').map(generateFilmInfo);
const filter = generateFilter(films);

const bodyPart = document.body;
const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const nonOperationalStateLoading = () => {
  render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
  render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING), RenderPosition.BEFOREEND);
  render(footerPart, new FooterView(FooterCondition.empty), RenderPosition.BEFOREEND);
};

const operationalState = () => {
  render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
  render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
  render(mainOfBody, new SortView(), RenderPosition.BEFOREEND);
  render(mainOfBody, new CardsContainerView(), RenderPosition.BEFOREEND);
  render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);

  const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

  const addThumbnailsCardClickHandler = function (card, film) {
    card.setClickHandler(CardsEventsOn.POSTER, () => {
      popup(film);
      bodyPart.classList.add('hide-overflow');
    });
    card.setClickHandler(CardsEventsOn.TITLE, () => {
      popup(film);
      bodyPart.classList.add('hide-overflow');
    });
    card.setClickHandler(CardsEventsOn.COMMENTS, () => {
      popup(film);
      bodyPart.classList.add('hide-overflow');
    });
  };

  const renderCards = (film) => {
    let cardData = new MovieCardView(film);
    render(containerDivInMovies, cardData, RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, film);
    cardData.removeElement();
    cardData = '';
  };

  const renderTopRating = (index) => {
    const filmsForTopRating = films.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
    let cardData = new MovieCardView(filmsForTopRating[index]);
    render(containerForMovieCards[1], cardData,  RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, filmsForTopRating[index]);
    cardData.removeElement();
    cardData = '';
  };

  const renderTopCommented = (index) => {
    const filmForTopCommented = films.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);
    let cardData = new MovieCardView(filmForTopCommented[index]);
    render(containerForMovieCards[2], cardData, RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, filmForTopCommented[index]);
    cardData.removeElement();
    cardData = '';
  };

  for (let ind = 0; ind <Math.min(films.length, FILMS_CARDS_PER_STEP); ind++) {renderCards(films[ind]);}

  if (films.length > FILMS_CARDS_PER_STEP) {
    let renderTemplateFilmsCount = FILMS_CARDS_PER_STEP;
    const placeForButtonElement = mainOfBody.querySelector('.films-list');
    const loadMoreButtonComponent = new ButtonShowMoreView();

    render(placeForButtonElement, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderTemplateFilmsCount, renderTemplateFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((film) => {renderCards(film);});

      renderTemplateFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderTemplateFilmsCount >= films.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  const sectionMovies = mainOfBody.querySelector('.films');
  render(sectionMovies, new TopCardsView(), RenderPosition.BEFOREEND);
  render(sectionMovies, new TopCommentsView(), RenderPosition.BEFOREEND);
  const containerForMovieCards = mainOfBody.querySelectorAll('.films-list__container');

  // ----> for TOP and MostCommented movies
  for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {renderTopRating (ind);}
  for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {renderTopCommented(ind);}

};

const popup = (chosenMovie) => {
  const MoviePopupChosen = new MoviePopupView (chosenMovie);
  render (bodyPart, MoviePopupChosen, RenderPosition.BEFOREEND);
  render (bodyPart.querySelector('.film-details__comments-title'), new CommentsPopupView(chosenMovie), RenderPosition.BEFOREEND);

  MoviePopupChosen.setClickHandler(() => {
    remove(MoviePopupChosen);
    bodyPart.classList.remove('hide-overflow');
  });
};

operationalState();
nonOperationalStateLoading();

export{films};
