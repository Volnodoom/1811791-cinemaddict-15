import { dateYearMonthDayTime, EmojiUrl, KeyType } from '../../utils/card-utils';
import AbstractView from '../abstract';
import he from 'he';

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

class PopupCommentsList extends AbstractView{
  constructor (film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._keyHandler = this._keyHandler.bind(this);
  }

  getTemplate () {
    return getUsersCommentsTemplate (this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      const index = this._film.comments.findIndex((line) => line.commentItself === evt.target.parentElement.previousElementSibling.textContent);
      const removedComment = this._film.comments.splice(index, 1);
      const helper = removedComment[0].id;

      this._callback.clickOnDeleteCommentButton(helper);
    }
  }

  setClickHandler(callback) {
    this._callback.clickOnDeleteCommentButton = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _keyHandler(evt) {
    evt.preventDefault();

    switch (true) {
      case (evt.key === 'Escape'):
        this._callback.keyOnCancel();
        break;
      case (evt.key === 'ControlLeft' && 'Enter'):
      case (evt.key === 'ControlRight' && 'Enter'):
        this._callback.keyOnSubmit();
        break;
    }
  }

  setKeyHandler(keyType, callback) {
    switch (keyType) {
      case KeyType.SUBMIT:
        this._callback.keyOnSubmit = callback;
        break;
      case KeyType.CANCEL:
        this._callback.keyOnCancel = callback;
        break;
    }

    this.getElement().addEventListener('keydown', this._keyHandler);
  }
}

export default PopupCommentsList;
