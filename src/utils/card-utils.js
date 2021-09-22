import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(dayOfYear);
dayjs.extend(isToday);

const MINUTES = 60;

const TimeLength = {
  WEEK: 7,
  MONTH: 1,
  YEAR: 1,
};

export const CardsEventsOn = {
  POSTER: 'film-card__poster',
  TITLE: 'film-card__title',
  COMMENTS: 'film-card__comments',
  FAVORITE: 'film-card__controls-item--favorite',
  WATCHED: 'film-card__controls-item--mark-as-watched',
  WATCHLIST: 'film-card__controls-item--add-to-watchlist',
};

export const EmojiContent = {
  SMILE: {
    id: 'emoji-smile',
    value: 'smile',
    imgUrl: './images/emoji/smile.png',
  },
  SLEEPING: {
    id: 'emoji-sleeping',
    value: 'sleeping',
    imgUrl: './images/emoji/sleeping.png',
  },
  PUKE: {
    id: 'emoji-puke',
    value: 'puke',
    imgUrl: './images/emoji/puke.png',
  },
  ANGRY: {
    id: 'emoji-angry',
    value: 'angry',
    imgUrl: './images/emoji/angry.png',
  },
};


export const EmojiUrl = {
  SMILE: 'images/emoji/smile.png ',
  SLEEPING: 'images/emoji/sleeping.png ',
  PUKE: 'images/emoji/puke.png ',
  ANGRY: 'images/emoji/angry.png ',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date-up',
  RATING: 'rating-up',
};

export const ToolbarNamesFromServer = {
  FAVORITE: 'favorite',
  WATCHED: 'alreadyWatched',
  WATCHLIST: 'watchlist',
};

export const PopupCardEventOn = {
  CLOSE_BTN:'film-details__close-btn',
  FAVORITE: 'favorite',
  WATCHED: 'watched',
  WATCHLIST: 'watchlist',
  DELETE_CMT: 'film-details__comment-delete',
  ESC_KEY: 'escape',
  ENTER_KEY: 'enter + ctr',
};

export const PopupCommentsState = {
  INPUT: 'input',
  CLICK: 'click',
};

export const KeyType = {
  SUBMIT: 'submit',
  CANCEL: 'cancel',
};

export const UrlTo = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

export const dateYearMonthDayTime = (timeInfo) => dayjs(timeInfo).format('YYYY/MM/DD HH:mm');
export const dateDayMonthYear = (timeInfo) => dayjs(timeInfo).format('DD MMMM YYYY');
export const dateYear = (timeInfo) => dayjs(timeInfo).format('YYYY');

export const isTodayDate = (date) => dayjs(date).isToday();

export const isWeekAgoDate = (date) => {
  const yearDayNumber = dayjs().dayOfYear();
  const weekAgo = dayjs().dayOfYear(yearDayNumber - TimeLength.WEEK);

  return weekAgo <= date;
};

export const isMonthAgoDate = (date) => {
  const yearMonthNumber = dayjs().month();
  const monthAgo = dayjs().month(yearMonthNumber - TimeLength.MONTH);

  return monthAgo <= date;
};

export const isYearAgoDate = (date) => {
  const yearNumber = dayjs().year();
  const yearAgo = dayjs().year(yearNumber - TimeLength.YEAR);

  return yearAgo <= date;
};

export const calculateTime = (movieDuration) => {
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

export const sortRating = (movieRateA, movieRateB) => movieRateB.totalRating - movieRateA.totalRating;
export const sortReleaseDate = (movieDateA, movieDateB) => dayjs(movieDateB.release.date).diff(dayjs(movieDateA.release.date));


