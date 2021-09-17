import SmartView from '../smart';
import he from 'he';

const createPopupCommentsNew = (film) => {
  const isSaving = film.isSaving;

  return (`<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" required ${isSaving ? 'disabled' : ''}></textarea>
          </label>

    <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
    </div>
  </div>`);
};

class PopupCommentsNew extends SmartView {
  constructor(film) {
    super();
    this._data = PopupCommentsNew.parseFilmsToData(film);
    this._innerClickHandler = this._innerClickHandler.bind(this);
    this._innerInputHandler = this._innerInputHandler.bind(this);

    this._setInnerHandler();
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  static parseFilmsToData(film) {
    return Object.assign(
      {},
      film,
      {
        localComments: '',
        localEmoji: '',
      },
    );
  }

  getTemplate () {
    return createPopupCommentsNew(this._data);
  }

  _innerClickHandler(evt) {
    if (evt.target.tagName === 'IMG') {
      evt.target.parentElement.previousElementSibling.checked = 'true';
      this.getElement().querySelector('.film-details__add-emoji-label')
        .innerHTML =`<img src="${evt.target.attributes[0].value}" width="55" height="55" alt="emoji-smile"></img>`;

      this.updateData({
        localEmoji: evt.target.parentElement.previousElementSibling.value,
      }, true);
    }
  }

  _setInnerHandler() {
    this.getElement().addEventListener('click', this._innerClickHandler);
    this.getElement().addEventListener('input', this._innerInputHandler);
  }

  _innerInputHandler (evt) {
    if (evt.target.tagName === 'TEXTAREA') {
      this.updateData({
        localComments: he.encode(evt.target.value),
      }, true);
    }
  }

  _formSubmitHandler (evt) {
    if (evt.ctrlKey && (evt.key === 'Enter' || evt.key === 'Enter')) {
      evt.preventDefault();
      this._callback.formSubmit(this._data);
      document.querySelector('form').submit();
    }
  }

  setOuterHandler (callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('keydown', this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandler();
  }
}

export default PopupCommentsNew;
