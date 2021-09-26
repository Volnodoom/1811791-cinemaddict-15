import AbstractView from './abstract.js';

const createBoardTemplate = () => '<section class="films"></section>';

class BoardView extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
export default BoardView;
