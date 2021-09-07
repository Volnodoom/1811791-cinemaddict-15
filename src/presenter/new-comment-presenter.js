import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import PopupCommentsNew from '../view/popup-relate-view/popup-comments-new.js';

export default class CommentNewPresenter {
  constructor(newCommentContainer, chosenMovie, changeData) {
    this._newCommentContainer = newCommentContainer;
    this._changeData = changeData;
    this._chosenMovie = chosenMovie;

    this._commentNewComponent = null;

    this._processFormSubmit = this._processFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._commentNewComponent !== null) {
      return;
    }

    this._commentNewComponent = new PopupCommentsNew(this._chosenMovie);
    this._commentNewComponent.setOuterHandler(this._processFormSubmit);

    render(this._newCommentContainer, this._commentNewComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._commentNewComponent === null) {
      return;
    }

    remove(this._commentNewComponent);
    this._commentNewComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _processFormSubmit() {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      Object.assign( {},
        {
          localId: nanoid(),
        },
        this._chosenMovie,
      ),
    );
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

}
