import { createLoadingTemplate, footerTemplateForBlankWithoutMovie, createEmptyBlank, headerAvatar, createMovieCardFramework} from './model/menu';

const bodyPart = document.body;
const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const loadState = () => {
  render(mainOfBody, createLoadingTemplate(), 'beforeend');
  render(footerPart, footerTemplateForBlankWithoutMovie, 'beforeend');
};

const emptyState = () => {
  render(mainOfBody, createEmptyBlank(), 'beforeend');
  render(footerPart, footerTemplateForBlankWithoutMovie, 'beforeend');
};

const avatar = () => {
  render(headerOfBody, headerAvatar, 'beforeend');
};

const operationalState = () => {
  render(mainOfBody, createMovieCardFramework(), 'beforeend');
};
operationalState();
// console.log(loadState);
