//import { createElement } from '../other/utils.js';
const FOOTER_STATEMENT_EMPTY = '0 movies inside';
const FOOTER_STATEMENT_UP_TO_DATE = '130 291 movies inside';
const EMPTY_STATEMENT = {
  loading: 'Loading...',
  allMovies: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now',
};
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

// const allEmptyConditionTemplates = {
//   loading: createEmptyCondition(EMPTY_STATEMENT.loading),
//   allMovies: createEmptyCondition(EMPTY_STATEMENT.allMovies),
//   watchlist: createEmptyCondition(EMPTY_STATEMENT.watchlist),
//   history: createEmptyCondition(EMPTY_STATEMENT.history),
//   favorites: createEmptyCondition(EMPTY_STATEMENT.favorites),
// };

const createEmptyTemplate = (filtersData, state) => (
  `${createFiltersTemplate(filtersData)}
   ${createEmptyCondition(EMPTY_STATEMENT[state])}`
);

const createHeaderAvatar = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${USER.rank}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`);

const footerTemplateForBlankWithoutMovie = `<p>${FOOTER_STATEMENT_EMPTY}</p>`;
const footerTemplateForUpToDate = `<p>${FOOTER_STATEMENT_UP_TO_DATE}</p>`;

export {createOperationalFramework, createFrameworkForExtraTop, createFrameworkForExtraMostComments, createEmptyTemplate, createHeaderAvatar, footerTemplateForBlankWithoutMovie, footerTemplateForUpToDate};
