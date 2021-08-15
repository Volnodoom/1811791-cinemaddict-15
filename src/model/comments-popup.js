import { dateYearMonthDayTime } from '../other/utils';
import AbstractView from './abstract';

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
  let filmComments = ``;

  for (let ind = 0; ind < film.comments.length; ind++) {
    const {commentItself, comAuthor, comDayTime, emotion} = film.comments[ind];

    filmComments += `<li class="film-details__comment">
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
  const allComments = `<ul class="film-details__comments-list">${filmComments}</ul>`;
  return allComments;
};

class CommentsPopup extends AbstractView{
  constructor (film) {
    super();
    this._film = film;
  }

  getTemplate () {
    return getUsersCommentsTemplate (this._film);
  }
}


export default CommentsPopup;