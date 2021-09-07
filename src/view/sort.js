import { SortType } from '../utils/card-utils.js';
import AbstractView from './abstract.js';

const createSortMoviesTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${(currentSortType === SortType.DEFAULT ? 'sort__button--active' : '')}" data-sort-type ="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${(currentSortType === SortType.DATE ? 'sort__button--active' : '')}" data-sort-type ="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${(currentSortType === SortType.RATING ? 'sort__button--active' : '')}" data-sort-type ="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

class Sort extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate () {
    return createSortMoviesTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    // const sortDom = document.querySelector('.sort').querySelectorAll('li');

    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);

    // for (const element of sortDom) {
    //   element.firstChild.classList.remove('sort__button--active');
    // }

    // switch (evt.target.dataset.sortType) {
    //   case SortType.DEFAULT:
    //     evt.target.classList.add('sort__button--active');
    //     break;
    //   case SortType.DATE:
    //     evt.target.classList.add('sort__button--active');
    //     break;
    //   case SortType.RATING:
    //     evt.target.classList.add('sort__button--active');
    //     break;
    // }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }


}

export default Sort;
