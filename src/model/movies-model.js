import AbstractObserver from '../utils/abstract-observer.js';

class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setMovies(films) {
    this._films = films.slice();
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

}

export default FilmsModel;
