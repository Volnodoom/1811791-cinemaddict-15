/* eslint-disable no-use-before-define */
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
import { UpdateType } from './const.js';

const AUTHORIZATION = 'Basic kTy9gONDT2389rD';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const bodyPart = document.body;

const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody =bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

render(headerOfBody, new AvatarView(), RenderPosition.BEFOREEND);
// render(mainOfBody, new FilterView(filters, 'all'), RenderPosition.BEFOREEND);
render(footerPart, new FooterView(FooterCondition.upToDate), RenderPosition.BEFOREEND);

const movieBoardPresenter = new MovieBoardPresenter(mainOfBody, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(mainOfBody, filterModel, filmsModel);

filterPresenter.init();
movieBoardPresenter.init();

api.getGeneralData()
  .then((films) => {
    filmsModel.setMovies(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setMovies(UpdateType.INIT, []);
  });

// const nonOperationalStateLoading = () => {
//   render(mainOfBody, new FilterView(filter), RenderPosition.BEFOREEND);
//   render(mainOfBody, new EmptyConditionView(EmptyStatement.LOADING), RenderPosition.BEFOREEND);
//   render(footerPart, new FooterView(FooterCondition.empty), RenderPosition.BEFOREEND);
// };

// nonOperationalStateLoading();
