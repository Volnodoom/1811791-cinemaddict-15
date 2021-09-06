import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter-utils.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';
import FilterView from '../view/filters.js';

class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;

    this._processModelEvent = this._processModelEvent.bind(this);
    this._processFilterTypeChange = this._processFilterTypeChange.bind();

    this._filmsModel.addObserver(this._processModelEvent);
    this._filterModel.addObserver(this._processModelEvent);
  }

  init() {
    const filters = this._getFilters;
    const prevFilterComponent = this._filterComponent;

    this._filterContainer = new FilterView (filters, this._filterModel.getFilter());
    this._filterContainer.setFilterTypeChangeHandler(this._processFilterTypeChange);

    if(prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
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
