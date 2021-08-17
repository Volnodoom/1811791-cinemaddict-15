/* eslint-disable no-use-before-define */
import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
import AvatarView from './model/avatar';
import BoardView from './model/board';
import ButtonShowMoreView from './model/button-show-more';
import CardsContainerView from './model/cards-container';
import CommentsPopupView from './model/comments-popup';
import ConditionMessageBlockView from './model/condition-message-block';
import EmptyConditionView from './model/empty-condition';
import TopComments from './model/extra-comments-cards';
import TopCommentsView from './model/extra-comments-cards';
import TopRatingView from './model/extra-top-cards';
import FilmListView from './model/film-list';
import FilmListContainerView from './model/film-list-container';
import FilterView from './model/filters';
import FooterView from './model/footer';
import MovieCardView from './model/movie-card.js';
import MoviePopupView from './model/movie-popup';
import SortView from './model/sort';
import MovieBoardPresenter from './presenter/movies-presenter';
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

render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);

render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);
// render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);

// const nonOperationalStateLoading = () => {
//   render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
//   render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING), RenderPosition.BEFOREEND);
//   render(footerPart, new FooterView(FooterCondition.empty), RenderPosition.BEFOREEND);
// };

// const movieBoardPresenter = new MovieBoardPresenter();
// movieBoardPresenter.init(films);

const operationalState = () => {
  const boardComponent = new BoardView();
  const filmListComponent = new FilmListView();
  const filmListContainer = new FilmListContainerView();


  render(mainOfBody, new SortView(), RenderPosition.BEFOREEND);
  render(mainOfBody, boardComponent, RenderPosition.BEFOREEND);
  render(boardComponent, filmListComponent, RenderPosition.BEFOREEND);
  render(filmListComponent, new ConditionMessageBlockView(), RenderPosition.BEFOREEND);
  render(filmListComponent, filmListContainer, RenderPosition.BEFOREEND);


  // const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

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
    render(filmListContainer, cardData, RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, film);
    cardData.removeElement();
    cardData = '';
  };

  const renderTopRating = (index) => {
    const filmsForTopRating = films.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating);
    let cardData = new MovieCardView(filmsForTopRating[index]);
    render(topRatingFilmContainer, cardData,  RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, filmsForTopRating[index]);
    cardData.removeElement();
    cardData = '';
  };

  const renderTopCommented = (index) => {
    const filmForTopCommented = films.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length);
    let cardData = new MovieCardView(filmForTopCommented[index]);
    render(topCommentsFilmContainer, cardData, RenderPosition.BEFOREEND);
    addThumbnailsCardClickHandler(cardData, filmForTopCommented[index]);
    cardData.removeElement();
    cardData = '';
  };

  for (let ind = 0; ind <Math.min(films.length, FILMS_CARDS_PER_STEP); ind++) {renderCards(films[ind]);}

  if (films.length > FILMS_CARDS_PER_STEP) {
    let renderTemplateFilmsCount = FILMS_CARDS_PER_STEP;
    const loadMoreButtonComponent = new ButtonShowMoreView();

    render(filmListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

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
  const topRatingComponent = new TopRatingView();
  const topRatingFilmContainer = new FilmListContainerView();
  render(boardComponent, topRatingComponent, RenderPosition.BEFOREEND);
  render(topRatingComponent, topRatingFilmContainer, RenderPosition.BEFOREEND);
  for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {renderTopRating (ind);}

  const topCommentsComponent = new TopCommentsView();
  const topCommentsFilmContainer = new FilmListContainerView();
  render(boardComponent, topCommentsComponent, RenderPosition.BEFOREEND);
  render(topCommentsComponent, topCommentsFilmContainer, RenderPosition.BEFOREEND);
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
// nonOperationalStateLoading();

export{films};
