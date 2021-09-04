import { dateYearMonthDayTime, EmojiUrl } from '../../utils/card-utils';
import AbstractView from '../abstract';

const getUsersCommentsTemplate = (film) => {
  // eslint-disable-next-line quotes
  let filmComments = '';

  const {comments} = film;
  if (comments.length === 0) {return '<ul class="film-details__comments-list"></ul>';}

  for (let ind = 0; ind < film.comments.length; ind++) {

    const {commentItself,
      comAuthor,
      comDayTime,
      emotion} = film.comments[ind];

    filmComments += `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${EmojiUrl[emotion.toUpperCase()]}" width="55" height="55" alt="${emotion}">
      </span>
    <div>
      <p class="film-details__comment-text">${commentItself}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comAuthor}</span>
        <span class="film-details__comment-day">${dateYearMonthDayTime(comDayTime)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  const allComments = `<ul class="film-details__comments-list">${filmComments}</ul>`;

  return allComments;
};

class PopupCommentsList extends AbstractView{
  constructor (film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate () {
    return getUsersCommentsTemplate (this._film);
  }

  _clickHandler(evt) {
    if (evt.target.tagName === 'BUTTON') {
      const index = this._film.comments.findIndex((line) => line.commentItself === evt.target.parentElement.previousElementSibling.textContent);
      this._film.comments.splice(index, 1);
      this._callback.clickOnDeleteCommentButton();
    }
  }

  setClickHandler(callback) {
    this._callback.clickOnDeleteCommentButton = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default PopupCommentsList;
