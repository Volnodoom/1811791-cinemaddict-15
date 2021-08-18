/* eslint-disable no-use-before-define */
import { generateFilmInfo } from './mock/card-mock';
import { generateFilter } from './mock/filter-mock';
import AvatarView from './model/avatar';
import EmptyConditionView from './model/empty-condition';
import FilterView from './model/filters';
import FooterView from './model/footer';
import MovieBoardPresenter from './presenter/movies-presenter';
import { render, RenderPosition, EmptyStatement, FooterCondition } from './utils/render.js';

const FILMS_CARDS_COUNT = 20;
const bodyPart = document.body;

const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const films = new Array (FILMS_CARDS_COUNT).fill(' ').map(generateFilmInfo);
const filter = generateFilter(films);

render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);

const movieBoardPresenter = new MovieBoardPresenter(mainOfBody);
movieBoardPresenter.init(films);


const nonOperationalStateLoading = () => {
  render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
  render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING), RenderPosition.BEFOREEND);
  render(footerPart, new FooterView(FooterCondition.empty), RenderPosition.BEFOREEND);
};

// nonOperationalStateLoading();
