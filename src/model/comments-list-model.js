import AbstractObserver from '../utils/abstract-observer.js';

class CommentsList extends AbstractObserver {
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

  addComments(updateType, update) {
    this._notify.slice();

    this._films = [
      ...this._films,
      update,
    ];

    this._notify(updateType);
  }

  deleteComments(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.it);

    if (index === -1) {
      throw new Error ('Can\'t update unexisting Film');
    }

    this._films = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType);
  }

}

export default CommentsList;
