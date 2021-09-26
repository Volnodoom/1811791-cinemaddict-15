import AbstractView from './abstract.js';

const createConditionMessageBlockTemplate = () => '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';

class ConditionMessageBlockView extends AbstractView{
  getTemplate () {
    return createConditionMessageBlockTemplate();
  }
}

export default ConditionMessageBlockView;
