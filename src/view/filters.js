import AbstractView from './abstract.js';

const createSingleFilterItemTemplate = (filterData, currentFilterType) => {
  const {type, name, count} = filterData;
  return (`<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
  ${name}<span class="main-navigation__item-count">${count}</span></a>`);
};

const createNavigationTemplate = (filtersData, currentFilterType) => {
  const filterItemsTemplate = filtersData.map((filter) => createSingleFilterItemTemplate(filter, currentFilterType)).join(' ');

  return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${currentFilterType === 'stats' ? 'main-navigation__item--active' : ''}">Stats</a>
    </nav>`);
};

class FilterView extends AbstractView{
  constructor (filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate () {
    return createNavigationTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    switch (evt.target.hash.slice(1)) {
      case 'all':
      case 'watchlist':
      case 'history':
      case 'favorites':
        this._callback.filterTypeChange(evt.target.hash.slice(1));
        document.querySelector('.main-navigation__additional').classList.remove('main-navigation__item--active');
        break;
      case 'stats':
        document.querySelector('.main-navigation__additional').classList.add('main-navigation__item--active');
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.MovieStatisticSwitch(evt.target.hash.slice(1));
  }

  setMovieStatisticSwitch(callback) {
    this._callback.MovieStatisticSwitch = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}

export default FilterView;
