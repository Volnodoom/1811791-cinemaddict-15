import AbstractView from './abstract.js';

const createFilmListTemplate = () => '<section class="films-list"></section>';

class FilmList extends AbstractView{
  getTemplate () {
    return createFilmListTemplate();
  }
}

export default FilmList;
