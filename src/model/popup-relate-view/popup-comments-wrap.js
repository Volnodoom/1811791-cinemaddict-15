import Abstract from '../abstract.js';

const createPopupCommentsWrap = () => '<section class="film-details__comments-wrap"> </section>';

class PopupCommentsWrap extends Abstract {
  getTemplate () {
    return createPopupCommentsWrap();
  }
}

export default PopupCommentsWrap;
