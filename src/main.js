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
import { render, RenderPosition, EmptyStatement, FooterCondition } from './other/utils.js';

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
  render(mainOfBody, new FilterView(filter).getElement(), RenderPosition.BEFOREEND);
  render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING).getElement(), RenderPosition.BEFOREEND);
  render(footerPart, new FooterView(FooterCondition.empty).getElement(), RenderPosition.BEFOREEND);
};

const operationalState = () => {
  render(headerOfBody, new AvatarView().getElement(), RenderPosition.BEFOREEND);
  render(mainOfBody, new FilterView(filter).getElement(), RenderPosition.BEFOREEND);
  render(mainOfBody, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(mainOfBody, new CardsContainerView().getElement(), RenderPosition.BEFOREEND);
  render(footerPart, new FooterView(FooterCondition.upToDate).getElement(), RenderPosition.BEFOREEND);

  const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

  for (let ind = 0; ind <Math.min(films.length, FILMS_CARDS_PER_STEP); ind++) {
    render(containerDivInMovies, new MovieCardView(films[ind]).getElement(), RenderPosition.BEFOREEND);
  }

  const placeForButtonElement = mainOfBody.querySelector('.films-list');

  if (films.length > FILMS_CARDS_PER_STEP) {
    let renderTemplateFilmsCount = FILMS_CARDS_PER_STEP;

    render(placeForButtonElement, new ButtonShowMoreView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = mainOfBody.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      films
        .slice(renderTemplateFilmsCount, renderTemplateFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((film) => render(containerDivInMovies, new MovieCardView(film).getElement(), RenderPosition.BEFOREEND));

      renderTemplateFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderTemplateFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }

  const sectionMovies = mainOfBody.querySelector('.films');

  render(sectionMovies, new TopCardsView().getElement(), RenderPosition.BEFOREEND);
  render(sectionMovies, new TopCommentsView().getElement(), RenderPosition.BEFOREEND);


  const containerForMovieCards = mainOfBody.querySelectorAll('.films-list__container');
  // ----> for TOP and MostCommented movies
  for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
    render(containerForMovieCards[1],
      new MovieCardView(films
        .slice()
        .sort((aInd,bInd) => bInd.totalRating - aInd.totalRating)[ind])
        .getElement(),
      RenderPosition.BEFOREEND);
  }
  for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
    render(containerForMovieCards[2],
      new MovieCardView(films
        .slice()
        .sort((aInd,bInd) => bInd.comments.length - aInd.comments.length)[ind])
        .getElement(),
      RenderPosition.BEFOREEND);
  }
};

const popup = (chosenMovie) => {
  render(bodyPart, new MoviePopupView (chosenMovie).getElement(), RenderPosition.BEFOREEND);

  const containerForUserCom = bodyPart.querySelector('.film-details__comments-list');
  render(containerForUserCom, new CommentsPopupView(chosenMovie).getElement(), RenderPosition.BEFOREEND);
};

operationalState();


//nonOperationalStateLoading();
// popup();

//const handler
//title, comments,

console.log (new MovieCardView(films[0]).getElement())

const posterA = new MovieCardView(films[0]);

// const addThumbnailsClickHandler = () => {
  posterA.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    //popup(chosenMovie);
    console.log ("click CLICK CLICK!!!");
  });
// };


// for (let ind = 0; ind < films.length; ind++) {
  // addThumbnailsClickHandler(new MovieCardView(films[0]).getElement().children[0]);
// }


export{films};
