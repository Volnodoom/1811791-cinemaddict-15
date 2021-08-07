/* eslint-disable arrow-body-style */
import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
import { createButtonShowMore } from './model/button-show-more';
import { createOperationalFramework, createFrameworkForExtraTop, createFrameworkForExtraMostComments, createEmptyTemplate, createHeaderAvatar, footerTemplateForBlankWithoutMovie, footerTemplateForUpToDate} from './model/menu';
import { creatCardTemplate } from './model/movie-card';
import { createPopupTemplate, getUsersComments } from './model/movie-popup';

const FILMS_CARDS_COUNT = 20;
const TOP_FILMS_COUNT = 2;
const MOST_COMMENTED_COUNT =2;

const films = new Array (FILMS_CARDS_COUNT).fill(' ').map(generateFilmInfo);
const filter = generateFilter(films);
console.log (filter[0].count.length);

const bodyPart = document.body;
const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const loadingState = () => {
  render(mainOfBody, createLoadingTemplate(), 'beforeend');
  render(footerPart, footerTemplateForBlankWithoutMovie, 'beforeend');
};

const emptyState = () => {
  render(mainOfBody, createEmptyBlank(), 'beforeend');
  render(footerPart, footerTemplateForBlankWithoutMovie, 'beforeend');
};

const operationalState = () => {
  render(mainOfBody, createMovieCardFramework(filter), 'beforeend');
//   render(footerPart, footerTemplateForUpToDate, 'beforeend');
//   render(headerOfBody, headerAvatar, 'beforeend');

//   const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

//   for (let ind = 0; ind <FILMS_CARDS_COUNT; ind++) {
//     render(containerDivInMovies, creatCardTemplate (films[ind]), 'beforeend');
//   }
//   render(containerDivInMovies, createButtonShowMore(), 'afterend');

//   const sectionMovies = mainOfBody.querySelector('.films-list');

//   render(sectionMovies, createMovieCardFrameworkMost(), 'afterend');
//   render(sectionMovies, createMovieCardFrameworkTop(), 'afterend');

//   const containerSectionExtraMovies = mainOfBody.querySelectorAll('.films-list__container');
//   // ----> for TOP and MostCommented movies
//   for (let ind = 0; ind <TOP_FILMS_COUNT; ind++) {
//     render(containerSectionExtraMovies[1], creatCardTemplate (films.slice().sort((aInd,bInd) => {return bInd.totalRating - aInd.totalRating;})[ind]), 'beforeend');
//   }
//   for (let ind = 0; ind <MOST_COMMENTED_COUNT; ind++) {
//     render(containerSectionExtraMovies[2], creatCardTemplate (films.slice().sort((aInd,bInd) => {return bInd.comments.length - aInd.comments.length;})[ind]), 'beforeend');
//   }
};

// const popup = () => {
//   render(bodyPart, createPopupTemplate(films[0]), 'beforeend');

//   const containerForUserCom = bodyPart.querySelector('.film-details__comments-list');
//   render(containerForUserCom, getUsersComments(films[0]), 'beforeend');
// };


operationalState();
// loadingState();
//popup();
// emptyState();

export{films};
