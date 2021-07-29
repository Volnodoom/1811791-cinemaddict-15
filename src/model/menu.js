const NAVIGATION_ITEM_ALL = 'All movies';
const NAVIGATION_ITEM_WATCHLIST = 'Watchlist';
const NAVIGATION_ITEM_HISTORY = 'History';
const NAVIGATION_ITEM_FAVORITES = 'Favorites';
const NAVIGATION_ITEM_STATS = 'Stats';
const EMPTY_WATCHLIST = 0;
const EMPTY_HISTORY = 0;
const EMPTY_FAVORITES = 0;
const NO_CARD_STATE = 'empty';
const LOADING_STATEMENT = 'Loading...';
const UPCOMING = 'All movies. Upcoming';
const FOOTER_STATEMENT_EMPTY = '0 movies inside';
const EMPTY_STATEMENT_F_ALL_MOVIES = 'There are no movies in our database';
const EMPTY_STATEMENT_F_WATCHLIST = 'There are no movies to watch now';
const EMPTY_STATEMENT_F_HISTORY = 'There are no watched movies now';
const EMPTY_STATEMENT_F_FAVORITES = 'There are no favorite movies now';
const EMPTY_STATEMENT_F_DEFAULT = 'There are no movies in our database';
const USER_RANK = 'Movie Buff';
const USER_AVATAR_URL = 'images/bitmap@2x.png';
const SORT_BUTTON1 = 'Sort by default';
const SORT_BUTTON2 = 'Sort by date';
const SORT_BUTTON3 = 'Sort by rating';
const NUMBER_WATCHLIST = 13;
const NUMBER_HISTORY = 4;
const NUMBER_FAVORITES = 8;

const createNavigationBlank = (watchlist, history, favorites) => (
  `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">${NAVIGATION_ITEM_ALL}</a>
  <a href="#watchlist" class="main-navigation__item">${NAVIGATION_ITEM_WATCHLIST} <span class="main-navigation__item-count">${watchlist}</span></a>
  <a href="#history" class="main-navigation__item">${NAVIGATION_ITEM_HISTORY} <span class="main-navigation__item-count">${history}</span></a>
  <a href="#favorites" class="main-navigation__item">${NAVIGATION_ITEM_FAVORITES} <span class="main-navigation__item-count">${favorites}</span></a>
</div>
  <a href="#stats" class="main-navigation__additional">${NAVIGATION_ITEM_STATS}</a>
</nav>`
);

const createSortMovies = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">${SORT_BUTTON1}</a></li>
  <li><a href="#" class="sort__button">${SORT_BUTTON2}</a></li>
  <li><a href="#" class="sort__button">${SORT_BUTTON3}</a></li>
  </ul>`
);

const createContainerForCardsOrMessage = (state = '', statusMessage = '') => {
  if (state === 'empty') { return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${statusMessage}</h2>
    </section>
    </section>`);
  } else {
    return (
      `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">${statusMessage}</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
    );
  }
};

const createMovieCardFramework = () => (
  `${createNavigationBlank(NUMBER_WATCHLIST, NUMBER_HISTORY, NUMBER_FAVORITES)}
   ${createSortMovies()}
   ${createContainerForCardsOrMessage('', UPCOMING)}`
);

const createLoadingTemplate = () => (
  `${createNavigationBlank(EMPTY_WATCHLIST, EMPTY_HISTORY, EMPTY_FAVORITES)}
   ${createContainerForCardsOrMessage(NO_CARD_STATE, LOADING_STATEMENT)}`
);

const createEmptyBlank = () => {
  // eslint-disable-next-line no-unused-vars
  const filterValues = [
    'All movies',
    'Whatchlist',
    'History',
    'Favorites',
  ];

  let emptyBlankFilter;
  const filterSetting = '';

  switch (filterSetting) {
    case 'All movies':
      emptyBlankFilter = createContainerForCardsOrMessage(NO_CARD_STATE, EMPTY_STATEMENT_F_ALL_MOVIES);
      break;
    case 'Whatchlist':
      emptyBlankFilter = createContainerForCardsOrMessage(NO_CARD_STATE, EMPTY_STATEMENT_F_WATCHLIST);
      break;
    case 'History':
      emptyBlankFilter = createContainerForCardsOrMessage(NO_CARD_STATE, EMPTY_STATEMENT_F_HISTORY);
      break;
    case 'Favorites':
      emptyBlankFilter = createContainerForCardsOrMessage(NO_CARD_STATE, EMPTY_STATEMENT_F_FAVORITES);
      break;
    default:
      emptyBlankFilter = createContainerForCardsOrMessage(NO_CARD_STATE, EMPTY_STATEMENT_F_DEFAULT);
      break;
  }

  return (
    `${createNavigationBlank(EMPTY_WATCHLIST, EMPTY_HISTORY, EMPTY_FAVORITES)}
   ${emptyBlankFilter}`);
};

const createHeaderAvatar = (rank,avatarUrl) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="${avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`);

const headerAvatar = createHeaderAvatar (USER_RANK, USER_AVATAR_URL);
const footerTemplateForBlankWithoutMovie = `<p>${FOOTER_STATEMENT_EMPTY}</p>`;

export {createLoadingTemplate, footerTemplateForBlankWithoutMovie, createEmptyBlank, headerAvatar, createMovieCardFramework};
