import { FilterType } from '../const.js';
import AbstractView from './abstract.js';

const NoMoviesTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

// const EmptyStatement = {
//   LOADING: 'Loading...',
// };

const createEmptyConditionTemplate = (filterType) => {
  const noMovieTextValue = NoMoviesTextType[filterType];
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${noMovieTextValue}</h2>
    </section>
  </section>`
  );
};

class NoMovieView extends AbstractView{
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate () {
    return createEmptyConditionTemplate (this._data);
  }
}

export default NoMovieView;
