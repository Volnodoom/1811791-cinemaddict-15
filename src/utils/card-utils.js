import dayjs from 'dayjs';

const MINUTES = 60;

const CardsEventsOn = {
  POSTER: 'film-card__poster',
  TITLE: 'film-card__title',
  COMMENTS: 'film-card__comments',
  FAVORITE: 'film-card__controls-item--favorite',
  WATCHED: 'film-card__controls-item--mark-as-watched',
  WATCHLIST: 'film-card__controls-item--add-to-watchlist',
};

const EmojiUrl = {
  SMILE: './images/emoji/smile.png ',
  SLEEPING: './images/emoji/sleeping.png ',
  PUKE: './images/emoji/puke.png ',
  ANGRY: './images/emoji/angry.png ',
};

const dateYearMonthDayTime = (timeInfo) => dayjs(timeInfo).format('YYYY/MM/DD HH:mm');
const dateDayMonthYear = (timeInfo) => dayjs(timeInfo).format('DD MMMM YYYY');
const dateYear = (timeInfo) => dayjs(timeInfo).format('YYYY');

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

export {CardsEventsOn, calculateTime, dateYearMonthDayTime, dateDayMonthYear, dateYear, EmojiUrl};
