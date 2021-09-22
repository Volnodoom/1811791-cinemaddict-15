import he from 'he';
import { dateYearMonthDayTime, EmojiUrl } from '../../utils/card-utils.js';

const creatOneCommentTemplate = (singleComment) => {
  const {
    commentItself,
    comAuthor,
    comDayTime,
    emotion,
    id,
  } = singleComment;

  return `<li class="film-details__comment" data-id= "${id}">
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
};

export const createCommentListHtmlLine = (film) => {
  const {comments} = film;

  switch (comments.length) {
    case 0:
      return '<ul class="film-details__comments-list"></ul>';
    default:
      return `<ul class="film-details__comments-list">
        ${comments.map((oneComment) => creatOneCommentTemplate(oneComment)).join(' ')}
      </ul>`;
  }
};
