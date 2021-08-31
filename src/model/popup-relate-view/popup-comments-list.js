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
      this.getElement().removeChild(evt.target.closest('li'));
    }
  }

  setClickHandler() {
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default PopupCommentsList;

// class PopupCommentsTitle extends Abstract {
//   constructor(film) {
//     super();
//     this._data = PopupCommentsTitle.parseFilmToData(film);
//   }

//   getTemplate() {
//     return createPopupCommentsTitle(this._data);
//   }

//   static parseFilmToData (film) {
//     return Object.assign(
//       {},
//       film,
//       {
//         hasNoComments: (film.comments.length === 0),
//       },
//     );
//   }

//   static parseDataToFilm (data) {
//     data = Object.assign({}, data);

//     if(data.hasNoComments) {
//       data.comments = [];
//     }

//     delete data.hasNoComments;

//     return data;
//   }
// }

// export default PopupCommentsTitle;
