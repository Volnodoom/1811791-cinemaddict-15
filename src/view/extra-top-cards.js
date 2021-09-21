import AbstractView from './abstract.js';

const createFrameworkForExtraTop = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

  </section>`
);

class ExtraTopRatingWrap extends AbstractView{
  getTemplate () {
    return createFrameworkForExtraTop();
  }
}

export default ExtraTopRatingWrap;
