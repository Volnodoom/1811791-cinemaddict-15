import dayjs from 'dayjs';

const calculateTime = (movieDuration) => {
  const MINUTES = 60;
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

  const altPoster = title;
  const year = dayjs(data).format('YYYY');



  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${calculateTime(runtime)}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="${altPoster}" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export {creatCardTemplate, calculateTime};
