import dayjs from 'dayjs';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const EmptyStatement = {
  LOADING: 'Loading...',
  ALL_MOVIES: 'There are no movies in our database',
  WHATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now',
};

const FooterCondition = {
  empty: '0 movies inside',
  upToDate: '130 291 movies inside',
};

const movieButtonActivation = (watchlist, alreadyWatched, favorite) => {
  let watchlistClassName = '';
  let historyClassName = '';
  let favoriteClassName = '';

  if (watchlist) {watchlistClassName = 'film-card__controls-item--active';} else {watchlistClassName = '';}
  if (alreadyWatched) {historyClassName = 'film-card__controls-item--active';} else { historyClassName = '';}
  if (favorite) {favoriteClassName = 'film-card__controls-item--active';} else {favoriteClassName = '';}

  watchlistClassName = '';
  historyClassName = '';
  favoriteClassName = '';
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveFloat = function (valueA, valueB, digits = 1) {
  const lower = Math.min (Math.abs(valueA), Math.abs(valueB));
  const upper = Math.max (Math.abs(valueA), Math.abs(valueB));
  const result = Math.random () * (upper - lower) + lower;
  return result.toFixed (digits);
};

const dateYearMonthDayTime = (timeInfo) => dayjs(timeInfo).format('YYYY/MM/DD HH:mm');
const dateDayMonthYear = (timeInfo) => dayjs(timeInfo).format('DD MMMM YYYY');
const dateYear = (timeInfo) => dayjs(timeInfo).format('YYYY');

const MINUTES = 60;

const calculateTime = (movieDuration) => {
  const hours = Math.trunc(movieDuration/MINUTES);
  let duration = '';
  const timeConditions = [
    movieDuration < MINUTES,
    movieDuration === MINUTES,
    movieDuration > MINUTES,
  ];

  switch (true) {
    case timeConditions[0]:
      duration = `${movieDuration}m`;
      break;
    case timeConditions[1]:
      duration = '1h';
      break;
    case timeConditions[2]:
      duration = `${hours}h ${movieDuration-hours*MINUTES}m`;
      break;
  }
  return duration;
};

export {getRandomInteger,
  getRandomPositiveFloat,
  dateYearMonthDayTime, dateDayMonthYear, dateYear, calculateTime,
  renderTemplate, renderElement, createElement, RenderPosition,
  EmptyStatement, FooterCondition, movieButtonActivation};
