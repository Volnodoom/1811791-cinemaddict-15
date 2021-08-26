import AbstractView from './abstract.js';

const createFrameworkForExtraMostComments = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

  </section>`
);

class TopComments extends AbstractView{
  getTemplate () {
    return createFrameworkForExtraMostComments();
  }
}

export default TopComments;
