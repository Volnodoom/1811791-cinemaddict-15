import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
//import { createButtonShowMore } from './model/button-show-more';
import CommentsPopupView from './model/comments-popup';
import MenuView from './model/menu';
import MovieCardView from './model/movie-card.js';
import MoviePopupView from './model/movie-popup';
import { renderElement, RenderPosition, EmptyStatement } from './other/utils.js';

console.log (MovieCardView.getElement)

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
  renderElement(mainOfBody, new MenuView(filter, EmptyStatement.LOADING).getElementEmpty(), RenderPosition.BEFOREEND);
  renderElement(mainOfBody, new MenuView().getElementFooterEmpty(), RenderPosition.BEFOREEND);
};

const operationalState = () => {
  renderElement(mainOfBody, new MenuView(filter).getElementFramework(), RenderPosition.BEFOREEND);
  renderElement(footerPart, new MenuView().getElementFooterFull(), RenderPosition.BEFOREEND);
  renderElement(headerOfBody, new MenuView().getElementAvatar(), RenderPosition.BEFOREEND);

  const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

  for (let ind = 0; ind <Math.min(films.length, FILMS_CARDS_PER_STEP); ind++) {
    renderElement(containerDivInMovies, new MovieCardView(films[ind]).getElement(), RenderPosition.BEFOREEND);
  }

  if (films.length > FILMS_CARDS_PER_STEP) {
    let renderTemplateFilmsCount = FILMS_CARDS_PER_STEP;

    //renderTemplate(containerDivInMovies, createButtonShowMore(), 'afterend');

    const showMoreButton = mainOfBody.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      films
        .slice(renderTemplateFilmsCount, renderTemplateFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((film) => renderElement(containerDivInMovies, new MovieCardView(film), RenderPosition.BEFOREEND));

      renderTemplateFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderTemplateFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }

  const sectionMovies = mainOfBody.querySelector('.films-list');

  renderElement(sectionMovies, new MenuView().getElementExtraComments(), RenderPosition.AFTERBEGIN);
  renderElement(sectionMovies, new MenuView().getElementExtraExtraTop(), RenderPosition.AFTERBEGIN);

  const containerSectionExtraMovies = mainOfBody.querySelectorAll('.films-list__container');
  // ----> for TOP and MostCommented movies
  for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
    renderElement(containerSectionExtraMovies[1],
      new MovieCardView(films
        .slice()
        .sort((aInd,bInd) => bInd.totalRating - aInd.totalRating)[ind])
        .getElement(),
      RenderPosition.BEFOREEND);
  }
  for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
    renderElement(containerSectionExtraMovies[2],
      new MovieCardView(films
        .slice()
        .sort((aInd,bInd) => bInd.comments.length - aInd.comments.length)[ind])
        .getElement(),
      RenderPosition.BEFOREEND);
  }
};

const popup = () => {
  renderElement(bodyPart, new MoviePopupView (films[0]).getElement(), RenderPosition.BEFOREEND);

  const containerForUserCom = bodyPart.querySelector('.film-details__comments-list');
  renderElement(containerForUserCom, new CommentsPopupView(films[0]).getElement(), RenderPosition.BEFOREEND);
};

operationalState();
nonOperationalStateLoading();
popup();

export{films};
