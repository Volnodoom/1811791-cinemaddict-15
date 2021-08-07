
const movieCardToFilter = {
  watchlist: (films) => films.filter((film) => film.userDetails.watchlist),
  history: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  favorites: (films) => films.filter((film) => film.userDetails.favorite),
};

const generateFilter = (films) => Object.entries(movieCardToFilter).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count:countFilms (films),
  }),
);

export {generateFilter};

