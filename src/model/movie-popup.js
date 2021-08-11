import { dateDayMonthYear, calculateTime, createElement, movieButtonActivation } from '../other/utils';

const localComment = 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.';

const createGenre = (genreData) => {
  let genreLine = '';
  if (genreData.length >= 2) {
    for (let ind = 0; ind < genreData.length; ind++) {
      if (genreData[ind] === undefined) { genreData[ind] = ''; } else {
        genreLine += `<span class="film-details__genre">${genreData[ind]}</span>`;}
    }
  } else {genreLine += `<span class="film-details__genre">${genreData[0]}</span>`;}

  return genreLine;
};

const createPopupTemplate = (film) => {
  const {poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, runtime, genre, description} = film;
  const {data, releaseCountry} = film.release;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  let termGenre ='';
  if (genre.length >= 2) {termGenre = 'Genres';} else {termGenre = 'Genre';}
  const writersLine = writers.join(', ');
  const actorsLine = actors.join(', ');
  const altPoster = title;

  let watchlistClassName = '';
  let historyClassName = '';
  let favoriteClassName = '';

  if (watchlist) {watchlistClassName = 'film-details__control-button--active';} else {watchlistClassName = '';}
  if (alreadyWatched) {historyClassName = 'film-details__control-button--active';} else {historyClassName = '';}
  if (favorite) {favoriteClassName = 'film-details__control-button--active';} else {favoriteClassName = '';}

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="${altPoster}">
        <p class="film-details__age">${ageRating}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writersLine}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actorsLine}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${dateDayMonthYear(data)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${calculateTime(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${termGenre}</td>
            <td class="film-details__cell">
              ${createGenre(genre)}
              </td>
          </tr>
        </table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${historyClassName}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

  <ul class="film-details__comments-list">
  </ul>

  <div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">
  <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
  </div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${localComment}</textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>
</div>
</section>
</div>

</form>
</section>`;
};

class MoviePopup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate () {
    return createPopupTemplate(this._film);
  }

  getElement () {
    if (!this._element){
      this._element = createElement (this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}

export default MoviePopup;

