import { dateYear } from '../other/utils';

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

const creatCardTemplate = (film) => {
  const {title, totalRating, runtime, genre, poster, description} = film;
  const {data} = film.release;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  const genreLine = genre.join(', ');
  const altPoster = title;

  let descriptionLine = '';
  if (description.length >= 140) {
    descriptionLine += description.slice().substring(0, 139);
    descriptionLine += '...';
  } else {descriptionLine = description;}

  let watchlistClassName = '';
  let historyClassName = '';
  let favoriteClassName = '';

  if (watchlist) {watchlistClassName = 'film-card__controls-item--active';} else {watchlistClassName = '';}
  if (alreadyWatched) {historyClassName = 'film-card__controls-item--active';} else {historyClassName = '';}
  if (favorite) {favoriteClassName = 'film-card__controls-item--active';} else {favoriteClassName = '';}

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dateYear(data)}</span>
    <span class="film-card__duration">${calculateTime(runtime)}</span>
    <span class="film-card__genre">${genreLine}</span>
  </p>
  <img src="${poster}" alt="${altPoster}" class="film-card__poster">
  <p class="film-card__description">${descriptionLine}</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${historyClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export {creatCardTemplate, calculateTime};
