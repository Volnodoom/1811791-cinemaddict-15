/* eslint-disable no-use-before-define */
import { generateFilmInfo } from './mock/card-mock';
import AvatarView from './view/avatar';
// import EmptyConditionView from './model/empty-condition';
import FooterView from './view/footer';
import MovieBoardPresenter from './presenter/board-presenter';
import FilmsModel from './model/movies-model.js';
import {
  render,
  RenderPosition,
  // EmptyStatement,
  FooterCondition
} from './utils/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import Api from './api.js';


const FILMS_CARDS_COUNT = 20;
const AUTHORIZATION = 'Basic kTy9gONDT2389rD';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const bodyPart = document.body;

const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const films = new Array (FILMS_CARDS_COUNT).fill(' ').map(generateFilmInfo);
const api = new Api(END_POINT, AUTHORIZATION);

api.getMovie().then((films) => {console.log(films)});

const filmsModel = new FilmsModel();
filmsModel.setMovies(films);

const filterModel = new FilterModel();

render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
// render(mainOfBody, new FilterView(filters, 'all'), RenderPosition.BEFOREEND);
render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);

const movieBoardPresenter = new MovieBoardPresenter(mainOfBody, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainOfBody, filterModel, filmsModel);

filterPresenter.init();
movieBoardPresenter.init();

// const nonOperationalStateLoading = () => {
//   render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
//   render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING), RenderPosition.BEFOREEND);
//   render(footerPart, new FooterView(FooterCondition.empty), RenderPosition.BEFOREEND);
// };

// nonOperationalStateLoading();
