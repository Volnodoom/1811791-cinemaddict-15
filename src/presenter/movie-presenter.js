// import BoardView from '../model/board.js';
// import ButtonShowMoreView from '../model/button-show-more.js';
// import CommentsPopupView from '../model/comments-popup.js';
// import ConditionMessageBlockView from '../model/condition-message-block.js';
// import TopCommentsView from '../model/extra-comments-cards.js';
// import TopRatingView from '../model/extra-top-cards.js';
// import FilmListView from '../model/film-list.js';
// import FilmListContainerView from '../model/film-list-container.js';
// import FilterView from '../model/filters.js';
import MovieCardView from '../model/movie-card.js';
// import MoviePopupView from '../model/movie-popup.js';
// import SortView from '../model/sort.js';
import { CardsEventsOn } from '../utils/card-utils.js';
import { render, RenderPosition } from '../utils/render.js';

class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

  }

  int (film) {
    this._film = film;

    this._movieCardComponent = new MovieCardView(film);



    render(this._movieListContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
  }

  _addThumbnailsCardClickHandler (card, film) {
    const callbackForClick = () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    };

    card.setClickHandler(CardsEventsOn.POSTER, callbackForClick);
    card.setClickHandler(CardsEventsOn.TITLE, callbackForClick);
    card.setClickHandler(CardsEventsOn.COMMENTS, callbackForClick);
  }

  _renderMovie(container,film) {
    let cardData = new MovieCardView(film);
    render(container, cardData, RenderPosition.BEFOREEND);
    this._addThumbnailsCardClickHandler(cardData, film);
    cardData.removeElement();
    cardData = '';
  }


}

export default Movie;
