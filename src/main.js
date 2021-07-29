import { createButtonShowMore } from './model/button-show-more';
import { createLoadingTemplate, footerTemplateForBlankWithoutMovie, footerTemplateForUpToDate, createEmptyBlank, headerAvatar, createMovieCardFramework, createMovieCardFrameworkTop, createMovieCardFrameworkMost} from './model/menu';
import { cardNumberOne } from './model/movie-card';
import { createPopupTemplate, getUsersComments } from './model/movie-popup';

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
  render(mainOfBody, createMovieCardFramework(), 'beforeend');
  render(footerPart, footerTemplateForUpToDate, 'beforeend');
  render(headerOfBody, headerAvatar, 'beforeend');

  const containerDivInMovies = mainOfBody.querySelector('.films-list__container');

  render(containerDivInMovies, cardNumberOne, 'beforeend');
  render(containerDivInMovies, cardNumberOne, 'beforeend');
  render(containerDivInMovies, cardNumberOne, 'beforeend');
  render(containerDivInMovies, cardNumberOne, 'beforeend');
  render(containerDivInMovies, cardNumberOne, 'beforeend');

  render(containerDivInMovies, createButtonShowMore(), 'afterend');

  const sectionMovies = mainOfBody.querySelector('.films-list');

  render(sectionMovies, createMovieCardFrameworkMost(), 'afterend');
  render(sectionMovies, createMovieCardFrameworkTop(), 'afterend');

  const containerSectionExtraMovies = mainOfBody.querySelectorAll('.films-list__container');

  render(containerSectionExtraMovies[1], cardNumberOne, 'beforeend');
  render(containerSectionExtraMovies[1], cardNumberOne, 'beforeend');
  render(containerSectionExtraMovies[2], cardNumberOne, 'beforeend');
  render(containerSectionExtraMovies[2], cardNumberOne, 'beforeend');
};

const popup = () => {
  render(bodyPart, createPopupTemplate(), 'beforeend');

  const containerForUserCom = bodyPart.querySelector('.film-details__comments-list');
  render(containerForUserCom, getUsersComments(), 'afterbegin');
};


operationalState();

