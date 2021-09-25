import AvatarView from './view/avatar';
import FooterView from './view/footer';
import BoardPresenter from './presenter/board-presenter';
import FilmsModel from './model/movies-model.js';
import { render, RenderPosition} from './utils/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import Api from './api.js';
import { UpdateType } from './const.js';

const AUTHORIZATION = 'Basic kTyYIQQzR389rD';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const bodyPart = document.body;

const footerPart = bodyPart.querySelector('.footer__statistics');
const headerOfBody = bodyPart.querySelector('.header');
const mainOfBody = bodyPart.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(mainOfBody, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(mainOfBody, filterModel, filmsModel, boardPresenter);

boardPresenter.init();
filterPresenter.init();

render(headerOfBody, new AvatarView(filmsModel), RenderPosition.BEFOREEND);
render(footerPart, new FooterView(filmsModel), RenderPosition.BEFOREEND);

api.getGeneralData()
  .then((films) => {
    filmsModel.setMovies(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setMovies(UpdateType.INIT, []);
  });


