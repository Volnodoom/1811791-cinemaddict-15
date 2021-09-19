import { FilterType, MenuItem, UpdateType } from '../const.js';
import { filter } from '../utils/filter-utils.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';
import FilterView from '../view/filters.js';
import StatisticsView from '../view/statistics.js';

class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel, boardPresenter) {
    this._boardPresenter = boardPresenter;

    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;
    this._movieStatisticSwitcherState = null;

    this._processModelEvent = this._processModelEvent.bind(this);
    this._processFilterTypeChange = this._processFilterTypeChange.bind(this);
    this._processMovieStatisticSwitch = this._processMovieStatisticSwitch.bind(this);

    this._filmsModel.addObserver(this._processModelEvent);
    this._filterModel.addObserver(this._processModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView (filters, this._filterModel.getFilter());

    this._filterComponent.setMovieStatisticSwitch(this._processMovieStatisticSwitch);
    this._filterComponent.setFilterTypeChangeHandler(this._processFilterTypeChange);

    if(prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _processMovieStatisticSwitch (menuItem) {
    switch (menuItem) {
      case MenuItem.MOVIES:
      case MenuItem.LIST:
      case MenuItem.HISTORY:
      case MenuItem.FAVORITES:
        if(this._movieStatisticSwitcherState === MenuItem.MOVIES) {
          return;
        }

        this._movieStatisticSwitcherState = MenuItem.MOVIES;
        this._boardPresenter.init();
        //скрыть статистику
        break;
      case MenuItem.STATISTICS:
        if(this._movieStatisticSwitcherState === MenuItem.STATISTICS) {
          return;
        }

        this._movieStatisticSwitcherState = MenuItem.STATISTICS;
        this._boardPresenter.destroy();
        render(this._filterContainer, new StatisticsView(this._filmsModel.getMovies()), RenderPosition.BEFOREEND);
        //показать статистику
        break;
    }
  }

  _processFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _processModelEvent() {
    this.init();
  }

  _getFilters() {
    const films = this._filmsModel.getMovies();
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}


export default FilterPresenter;
