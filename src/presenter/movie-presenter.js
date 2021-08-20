import CommentsPopupView from '../model/comments-popup.js';
import MovieCardView from '../model/movie-card.js';
import MoviePopupView from '../model/movie-popup.js';
import { CardsEventsOn } from '../utils/card-utils.js';
import { render, remove, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

class Movie {
  constructor(movieListContainer) {
    this._movieListContainerX = movieListContainer;
    this._bodyPart = document.body;
  }

  init (film) {
    this._film = film;

    this._filmComponent = new MovieCardView(film);

    render(this._movieListContainerX, this._filmComponent, RenderPosition.BEFOREEND);

    const onClickPopup = () => {
      this._renderPopup(film);
      this._bodyPart.classList.add('hide-overflow');
    };

    this._filmComponent.setClickHandler(CardsEventsOn.POSTER, onClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.TITLE, onClickPopup);
    this._filmComponent.setClickHandler(CardsEventsOn.COMMENTS, onClickPopup);
  }

  _renderPopup (chosenMovie) {
    this._popupFilm = chosenMovie;

    this._popupFilmComponent = new MoviePopupView (chosenMovie);

    render (this._bodyPart, this._popupFilmComponent, RenderPosition.BEFOREEND);
    render (this._bodyPart.querySelector('.film-details__comments-title'), new CommentsPopupView(chosenMovie), RenderPosition.BEFOREEND);

    popupCard.setClickHandler(() => {
      remove(popupCard);
      this._bodyPart.classList.remove('hide-overflow');
    });
  }

}

export default { Movie };
