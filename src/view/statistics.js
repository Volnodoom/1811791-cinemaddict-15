import { StatisticsPeriodValue } from '../const.js';
import { parseInfoToStatisticData } from '../utils/statistics-utils.js';
import Smart from './smart.js';


const createStatisticsTemplate = ({
  yourRank,
  isRank,
  htmlTimeLine,
  favoriteGenre,
  numberWatched,
  selectedPeriod}) => `<section class="statistic">
    ${ isRank ? `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${yourRank}</span>
    </p>` : ''}

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticsPeriodValue.ALL}" value="${StatisticsPeriodValue.ALL}" ${selectedPeriod === StatisticsPeriodValue.ALL ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${StatisticsPeriodValue.TODAY}" ${selectedPeriod === StatisticsPeriodValue.TODAY ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${StatisticsPeriodValue.WEEK}" ${selectedPeriod === StatisticsPeriodValue.WEEK ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${StatisticsPeriodValue.MONTH}" ${selectedPeriod === StatisticsPeriodValue.MONTH ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${StatisticsPeriodValue.YEAR}" ${selectedPeriod === StatisticsPeriodValue.YEAR ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${numberWatched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        ${htmlTimeLine}
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${favoriteGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;

export default class StatisticsView extends Smart {
  constructor(films) {
    super();
    this._films = films;
    this._data = parseInfoToStatisticData(this._films);

    this._statsFilterHandler = this._statsFilterHandler.bind(this);

    this._setClickHandler();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  removeElement() {
    super.removeElement();

    //some additional logic
  }

  _setClickHandler() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._statsFilterHandler);
  }

  _statsFilterHandler(evt) {
    this.updateData(parseInfoToStatisticData(this._films, evt.target.value));
  }

  restoreHandlers() {
    this._setClickHandler();
  }

}
