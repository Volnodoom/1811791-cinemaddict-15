import AbstractView from './abstract.js';

const createSortMovies = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

class Sort extends AbstractView {
  getTemplate () {
    return createSortMovies();
  }
}

export default Sort;
