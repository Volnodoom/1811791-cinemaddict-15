import AbstractView from './abstract.js';

const USER = {
  rank: 'Movie Buff',
  avatarUrl: 'images/bitmap@2x.png',
};

const createHeaderAvatar = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">${USER.rank}</p>
    <img class="profile__avatar" src="${USER.avatarUrl}" alt="Avatar" width="35" height="35">
  </section>`);

class Avatar extends AbstractView {
  getTemplate () {
    return createHeaderAvatar();
  }
}

export default Avatar;
