import FilmsModel from './model/movies-model.js';

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

  getMovie() {
    return this._load ({url: 'movies'})
      .then(Api.parsJSONtoObject)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateMovie(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.parsJSONtoObject)
      .then(FilmsModel.adaptToClient);
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
