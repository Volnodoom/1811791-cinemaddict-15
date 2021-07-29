const MOVIE_NAME = 'The Dance of Life';
const MOVIE_RATING = '8.3';
const MOVIE_YEAR = '1929';
const MOVIE_DURATION = '1h 55m';
const MOVIE_GENRE = 'Musical';
const MOVIE_IMG_URL = './images/posters/the-dance-of-life.jpg';
const MOVIE_DESCRIPTION = 'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…';
const MOVIE_NUMB_COMMENTS = '5';


const creatCardTemplate = (name, rating, year, duration, genre, imgUrl, description, numbComments) => (
  `<article class="film-card">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${imgUrl}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${numbComments} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`
);

const cardNumberOne = creatCardTemplate (MOVIE_NAME, MOVIE_RATING, MOVIE_YEAR, MOVIE_DURATION, MOVIE_GENRE, MOVIE_IMG_URL, MOVIE_DESCRIPTION, MOVIE_NUMB_COMMENTS);

export {cardNumberOne};
