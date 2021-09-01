import AbstractView from './abstract.js';

const firstLetterUpperCaseString = (string) => string[0].toUpperCase() + string.slice(1);
const createSingleFilterItemTemplate = (filterData) => {
  const {name, count} = filterData;
  let countElements = count.length;
  if (countElements === 0) {countElements = 0;}
  return `<a href="#${name}" class="main-navigation__item">${firstLetterUpperCaseString(name)}<span class="main-navigation__item-count">${countElements}</span></a>`;
};

const createFiltersTemplate = (filtersData) => {
  const filterItemsTemplate = filtersData.map((filter) => createSingleFilterItemTemplate(filter)).join(' ');
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
  </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

class Filter extends AbstractView{
  constructor (filter) {
    super();
    this._filter = filter;
  }

  getTemplate () {
    return createFiltersTemplate(this._filter);
  }
}

export default Filter;
