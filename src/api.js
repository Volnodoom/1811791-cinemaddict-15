import FilmsModel from './model/movies-model.js';
import { UrlTo } from './utils/card-utils.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getGeneralData() {
    return this._getMovies()
      .then((movies) => {
        const promisifyArrayComments = movies.map((film) => this._getComments(film));

        return Promise.allSettled(promisifyArrayComments)
          .then((comments) => movies
            .map((film) => {
              const commentsForCurrentFilm = comments.filter((commentsForFilm) => film.id === commentsForFilm.value.filmId);

              const correctedFormOfResults = Object.values(commentsForCurrentFilm[0].value);
              correctedFormOfResults.pop();

              const results = {
                ...film,
                'comments': correctedFormOfResults,
              };

              delete results.comments[0].filmId;

              return results;

            }),
          );
      });
  }

  _getMovies() {
    return this._load ({url: UrlTo.MOVIES})
      .then(Api.parsJSONtoObject)
      .then((films) => films.map(FilmsModel.adaptToClientMovie));
  }

  _getComments(film) {
    return this._load ({url: `${UrlTo.COMMENTS}/${film.id}`})
      .then(Api.parsJSONtoObject)
      .then((commentsForOneFilm) => commentsForOneFilm.map(FilmsModel.adaptToClientComments))
      .then((commentsForOneFilm) => ({
        filmId: film.id,
        ...commentsForOneFilm}));
  }

  updateMovie(film) {
    return this._load({
      url: `${UrlTo.MOVIES}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServerMovie(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.parsJSONtoObject)
      .then(FilmsModel.adaptToClientMovie);
  }

  updateComments(film) {
    return this._load({
      url: `${UrlTo.COMMENTS}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServerComments(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.parsJSONtoObject)
      .then(FilmsModel.adaptToClientComments);

  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if(!response.ok) {
      throw new Error(`${response.status}: :${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static parsJSONtoObject (response) {
    return response.json();
  }
}
