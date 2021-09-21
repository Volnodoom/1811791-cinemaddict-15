import { dateYearMonthDayTime, EmojiUrl } from '../../utils/card-utils';
import he from 'he';
import Smart from '../smart.js';
import { SHAKE_ANIMATION_TIMEOUT } from '../../const.js';

const getUsersCommentsTemplate = (film) => {
  // eslint-disable-next-line quotes
  let filmComments = '';

  const {comments} = film;
  if (comments.length === 0) {return '<ul class="film-details__comments-list"></ul>';}

  for (let ind = 0; ind < film.comments.length; ind++) {

    const {commentItself,
      comAuthor,
      comDayTime,
      emotion,
      id,
    } = film.comments[ind];

    filmComments += `<li class="film-details__comment" data-id= "${id}">
      <span class="film-details__comment-emoji">
        <img src="${EmojiUrl[emotion.toUpperCase()]}" width="55" height="55" alt="${emotion}">
      </span>
    <div>
      <p class="film-details__comment-text">${he.encode(commentItself)}</p>
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

class PopupCommentsList extends Smart {
  constructor (film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);

    this._eventTarget= null;
    this._deletedCommentId = null;
  }

  getTemplate () {
    return getUsersCommentsTemplate (this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      this._eventTarget = evt.target;

      const index = this._film.comments.findIndex((line) => line.commentItself === evt.target.parentElement.previousElementSibling.textContent);

      const deletedCommentId = this._film.comments[index].id;
      this._deletedCommentId = this._film.comments[index].id;

      evt.target.innerText = 'Deleting...';
      evt.target.disabled = true;

      this._callback.clickOnDeleteCommentButton(deletedCommentId);
    }
  }

  setAborting() {
    this._eventTarget.innerText = 'Delete';
    this._eventTarget.disabled = false;

    this._eventTarget.closest('li').style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._eventTarget.closest('li').style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setClickHandler(callback) {
    this._callback.clickOnDeleteCommentButton = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  restoreHandlers() {
    this.setClickHandler(this._callback.clickOnDeleteCommentButton);
  }
}

export default PopupCommentsList;
