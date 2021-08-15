import AbstractView from './abstract.js';

const BUTTON_CALL = 'Show more';

const createButtonShowMore = () => (
  `<button class="films-list__show-more">${BUTTON_CALL}</button>`
);

class ButtonShowMore extends AbstractView {
  getTemplate () {
    return createButtonShowMore();
  }
}

export default ButtonShowMore;
