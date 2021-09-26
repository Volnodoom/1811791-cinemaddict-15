import AbstractView from './abstract.js';

const createFilmListTemplate = () => '<section class="films-list"></section>';

class FilmListView extends AbstractView{
  getTemplate () {
    return createFilmListTemplate();
  }
}

export default FilmListView;
