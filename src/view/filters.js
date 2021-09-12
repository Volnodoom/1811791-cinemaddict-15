import AbstractView from './abstract.js';

const createSingleFilterItemTemplate = (filterData, currentFilterType) => {
  const {type, name, count} = filterData;
  return (`<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
  ${name}<span class="main-navigation__item-count">${count}</span></a>`);
};

const createFiltersTemplate = (filtersData, currentFilterType) => {
  const filterItemsTemplate = filtersData.map((filter) => createSingleFilterItemTemplate(filter, currentFilterType)).join(' ');

  return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
};

class FilterView extends AbstractView{
  constructor (filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate () {
    return createFiltersTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    switch (evt.target.hash.slice(1)) {
      case 'all':
      case 'watchlist':
      case 'history':
      case 'favorites':
        this._callback.filterTypeChange(evt.target.hash.slice(1));
        break;
      case 'stats':
        break;
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

export default FilterView;
