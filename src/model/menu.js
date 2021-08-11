import { createElement } from '../other/utils.js';

const FOOTER_STATEMENT_EMPTY = '0 movies inside';
const FOOTER_STATEMENT_UP_TO_DATE = '130 291 movies inside';

const USER = {
  rank: 'Movie Buff',
  avatarUrl: 'images/bitmap@2x.png',
};

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

const createSortMovies = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

const createForAllCardsTemplate = () => (
  `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

const createOperationalFramework = (filtersData) => (
  `${createFiltersTemplate(filtersData)}
   ${createSortMovies()}
   ${createForAllCardsTemplate()}`
);

const createFrameworkForExtraTop = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

const createFrameworkForExtraMostComments = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

const createEmptyCondition = (message) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section>
  </section>`
);

const createEmptyTemplate = (filtersData, message) => (
  `${createFiltersTemplate(filtersData)}
   ${createEmptyCondition(message)}`
);

const createHeaderAvatar = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${USER.rank}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`);

const footerTemplateForBlankWithoutMovie = `<p>${FOOTER_STATEMENT_EMPTY}</p>`;
const footerTemplateForUpToDate = `<p>${FOOTER_STATEMENT_UP_TO_DATE}</p>`;

class Menu {
  constructor(filter, message) {
    this._filter = filter;
    this._message = message;
    this._element1 = null;
    this._element2 = null;
    this._element3 = null;
    this._element4 = null;
    this._element5 = null;
    this._element6 = null;
    this._element7 = null;
  }

  getTemplateFramework() {
    return createOperationalFramework (this._filter);
  }

  getTemplateExtraTop() {
    return createFrameworkForExtraTop();
  }

  getTemplateExtraComments() {
    return createFrameworkForExtraMostComments();
  }

  getTemplateEmpty() {
    return createEmptyTemplate(this._filter, this._message);
  }


  getTemplateAvatar() {
    return createHeaderAvatar();
  }

  getTemplateFooterEmpty() {
    return footerTemplateForBlankWithoutMovie;
  }

  getTemplateFooterFull() {
    return footerTemplateForUpToDate;
  }

  getElementFramework() {
    if (!this._element1) {
      this._element1 = createElement(this.getTemplateFramework());
    }

    return this._element1;
  }

  getElementExtraTop () {
    if (!this._element2) {
      this._element2 = createElement(this.getTemplateExtraTop());
    }

    return this._element2;
  }

  getElementExtraComments () {
    if (!this._element3) {
      this._element3 = createElement(this.getTemplateExtraComments());
    }

    return this._element3;
  }

  getElementEmpty () {
    if (!this._element7) {
      this._element7 = createElement(this.getTemplateEmpty());
    }

    return this._element7;
  }

  getElementAvatar () {
    if (!this._element4) {
      this._element4 = createElement(this.getTemplateAvatar());
    }

    return this._element4;
  }

  getElementFooterEmpty () {
    if (!this._element5) {
      this._element5 = createElement(this.getTemplateFooterEmpty());
    }

    return this._element5;
  }

  getElementFooterFull () {
    if (!this._element6) {
      this._element6 = createElement(this.getTemplateFooterFull());
    }

    return this._element6;
  }

  removeElementFramework () {
    this._element1 = null;
  }

  removeElementExtraTop () {
    this._element2 = null;
  }

  removeElementExtraComments () {
    this._element3 = null;
  }

  removeElementEmpty () {
    this._element7 = null;
  }

  removeElementAvatar () {
    this._element4 = null;
  }

  removeElementFooterEmpty() {
    this._element5 = null;
  }

  removeElementFooterFull () {
    this._element6 = null;
  }

}

export default Menu;
