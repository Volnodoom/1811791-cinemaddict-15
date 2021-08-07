import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
import { createButtonShowMore } from './model/button-show-more';
import { createOperationalFramework, createFrameworkForExtraTop, createFrameworkForExtraMostComments, createEmptyTemplate, createHeaderAvatar, footerTemplateForBlankWithoutMovie, footerTemplateForUpToDate} from './model/menu';
import { creatCardTemplate } from './model/movie-card';
import { createPopupTemplate, getUsersComments } from './model/movie-popup';

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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const nonOperationalStateLoading = () => {
  render(mainOfBody, createEmptyTemplate(filter, 'loading'), 'beforeend');
  render(footerPart, footerTemplateForBlankWithoutMovie, 'beforeend');
};

const operationalState = () => {
  render(mainOfBody, createOperationalFramework(filter), 'beforeend');
  render(footerPart, footerTemplateForUpToDate, 'beforeend');
  render(headerOfBody, createHeaderAvatar(), 'beforeend');

  const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

  for (let ind = 0; ind <Math.min(films.length, FILMS_CARDS_PER_STEP); ind++) {
    render(containerDivInMovies, creatCardTemplate (films[ind]), 'beforeend');
  }

  if (films.length > FILMS_CARDS_PER_STEP) {
    let renderFilmsCount = FILMS_CARDS_PER_STEP;

    render(containerDivInMovies, createButtonShowMore(), 'afterend');

    const showMoreButton = mainOfBody.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      films
        .slice(renderFilmsCount, renderFilmsCount + FILMS_CARDS_PER_STEP)
        .forEach((film) => render(containerDivInMovies, creatCardTemplate (film), 'beforeend'));

      renderFilmsCount += FILMS_CARDS_PER_STEP;

      if (renderFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }

  const sectionMovies = mainOfBody.querySelector('.films-list');

  render(sectionMovies, createFrameworkForExtraMostComments(), 'afterend');
  render(sectionMovies, createFrameworkForExtraTop(), 'afterend');

  const containerSectionExtraMovies = mainOfBody.querySelectorAll('.films-list__container');
  // ----> for TOP and MostCommented movies
  for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
    render(containerSectionExtraMovies[1], creatCardTemplate (films.slice().sort((aInd,bInd) => bInd.totalRating - aInd.totalRating)[ind]), 'beforeend');
  }
  for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
    render(containerSectionExtraMovies[2], creatCardTemplate (films.slice().sort((aInd,bInd) => bInd.comments.length - aInd.comments.length)[ind]), 'beforeend');
  }
};

const popup = () => {
  render(bodyPart, createPopupTemplate(films[0]), 'beforeend');

  const containerForUserCom = bodyPart.querySelector('.film-details__comments-list');
  render(containerForUserCom, getUsersComments(films[0]), 'beforeend');
};

operationalState();
nonOperationalStateLoading();
popup();

export{films};
