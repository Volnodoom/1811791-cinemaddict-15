import AbstractView from './abstract.js';

const createFilmListContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmListContainerView extends AbstractView{
  getTemplate () {
    return createFilmListContainerTemplate();
  }
}

export default FilmListContainerView;
