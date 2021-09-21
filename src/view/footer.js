
import Smart from './smart.js';

class Footer extends Smart{
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._filmsCount = null;

    this._processModelUpdateForFooter = this._processModelUpdateForFooter.bind(this);
    this._filmsModel.addObserver(this._processModelUpdateForFooter);
  }

  getTemplate () {
    return `<p>${this._filmsCount} movies inside</p>`;
  }

  _processModelUpdateForFooter() {
    this._filmsCount = this._filmsModel.getMovies().length;

    this.updateData({number: this._filmsCount});
  }

  restoreHandlers() {

  }
}

export default Footer;
