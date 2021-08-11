import { createElement } from '../other/utils.js';

const USER = {
  rank: 'Movie Buff',
  avatarUrl: 'images/bitmap@2x.png',
};

const createHeaderAvatar = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${USER.rank}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`);

class Avatar {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createHeaderAvatar();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}

export default Avatar;
