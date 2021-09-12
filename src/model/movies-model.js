import AbstractObserver from '../utils/abstract-observer.js';

class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setMovies(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._films;
  }

  updateMovie(UpdateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(UpdateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign (
      {},
      film,
      {
        ... film['film_info'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info'] ['total_rating'],
        ageRating: film['film_info']['age_rating'],
        release: {
          ... film['film_info'].release,
          releaseCountry: film['film_info'].release['release_country'],
        },
        userDetails: {
          ...film['user_details'],
          alreadyWatched: film['user_details']['already_watched'],
          watchingDate: film['user_details']['watching_date'],
        },
      },
    );

    delete adaptedFilm['film_info'];
    delete adaptedFilm['alternative_title'];
    delete adaptedFilm['total_rating'];
    delete adaptedFilm['age_rating'];
    delete adaptedFilm.release['release_country'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedMovie = Object.assign(
      {},
      {
        id: film.id,
        comments: film.comments,
        'film_info': {
          title: film.title,
          'alternative_title': film.alternativeTitle,
          'total_rating': film.totalRating,
          poster: film.poster,
          'age_rating': film.ageRating,
          director: film.director,
          writers: film.writers,
          actors: film.actors,
          release: {
            date: film.release.date,
            'release_country': film.release.releaseCountry,
          },
          runtime: film.runtime,
          genre: film.genre,
          description: film.description,
        },
        'user_details': {
          watchlist: film.userDetails.watchlist,
          'already_watched': film.userDetails.alreadyWatched,
          'watching_date': film.userDetails.watchingDate,
          favorite: film.userDetails.favorite,
        },
      },
    );

    return adaptedMovie;
  }
}

export default FilmsModel;
