import AbstractView from './abstract.js';

const firstLetterUpperCaseString = (string) => string[0].toUpperCase() + string.slice(1);
const createSingleFilterItemTemplate = (filterData, currentFilterType) => {
  const {name, count} = filterData;
  let countElements = count.length;
  if (countElements === 0) {countElements = 0;}
  return (`<a href="#${name}" class="main-navigation__item ${name === currentFilterType ? 'main-navigation__item--active' : ''}">
  ${firstLetterUpperCaseString(name)}<span class="main-navigation__item-count">${countElements}</span></a>`);
};

const createFiltersTemplate = (filtersData, currentFilterType) => {
  const filterItemsTemplate = filtersData.map((filter) => createSingleFilterItemTemplate(filter, currentFilterType)).join(' ');

  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    /nav>
  `;
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

    switch (evt.target.id) {
      case 'all':
        break;
      case 'watchlist':
        break;
      case 'history':
        break;
      case 'favorites':
        break;
      case 'stats':
        break;
    }
// evt should be === to filterType data
    this._callback.filterTypeChange(evt);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

export default FilterView;
