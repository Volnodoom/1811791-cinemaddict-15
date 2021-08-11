import { createElement, dateYearMonthDayTime } from '../other/utils';

const getEmojiUrl = (datum) => {
  const emojiUrl = {
    smile: './images/emoji/smile.png ',
    sleeping: './images/emoji/sleeping.png ',
    puke: './images/emoji/puke.png ',
    angry: './images/emoji/angry.png ',
  };

  return emojiUrl[datum];
};

const getUsersCommentsTemplate = (film) => {
  // eslint-disable-next-line quotes
  let allComments = ``;

  for (let ind = 0; ind < film.comments.length; ind++) {
    const {commentItself, comAuthor, comDayTime, emotion} = film.comments[ind];

    allComments += `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${getEmojiUrl(emotion)}" width="55" height="55" alt="${emotion}">
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

  return allComments;
};

class CommentsPopup {
  constructor (film) {
    this._film = film;
    this._element = null;
  }

  getTemplate () {
    return getUsersCommentsTemplate (this._film);
  }

  getElement () {
    if (!this._element) {
      this._element = createElement (this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}


export default CommentsPopup;
