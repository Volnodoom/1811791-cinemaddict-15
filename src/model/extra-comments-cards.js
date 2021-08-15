import AbstractView from './abstract.js';

const createFrameworkForExtraMostComments = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">

    </div>
  </section>`
);

class TopComments extends AbstractView{
  getTemplate () {
    return createFrameworkForExtraMostComments();
  }
}

export default TopComments;
