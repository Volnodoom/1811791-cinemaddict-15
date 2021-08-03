/* eslint-disable quotes */
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveFloat = function (valueA, valueB, digits = 1) {
  const lower = Math.min (Math.abs(valueA), Math.abs(valueB));
  const upper = Math.max (Math.abs(valueA), Math.abs(valueB));
  const result = Math.random () * (upper - lower) + lower;
  return result.toFixed (digits);
};

const generateTitle = () => {
  const titles = [
    'Made-for-each-other',
    'Popeye-meets-sinbad',
    'Sagebrush-trail',
    'Santa-claus-conquers-the-martians',
    'The-dance-of-life',
  ];

  const randomIndex =  getRandomInteger(0, titles.length-1);
  return titles[randomIndex];
};

const generatePoster = () => {
  const poster = [
    '../../markup/images/posters/made-for-each-other.png',
    '../../markup/images/posters/popeye-meets-sinbad.png',
    '../../markup/images/posters/sagebrush-trail.png',
    '../../markup/images/posters/santa-claus-conquers-the-martians.png',
    '../../markup/images/posters/the-dance-of-life.png',
  ];

  const randomIndex =  getRandomInteger(0, poster.length-1);
  return poster[randomIndex];
};

const ageRating = `${getRandomInteger(6,18)}+`;
const totalRating = getRandomPositiveFloat(1,10,2);

const generateDirector = () => {
  const director = [
    'Ida Lupino',
    'Bong Joon Ho',
    'Guillermo del Toro',
    'David Cronenberg',
    'Sidney Lumet',
  ];

  const randomIndex =  getRandomInteger(0, director.length-1);
  return director[randomIndex];
};

const generateWriters = () => {
  const writers = [
    'Richard Brody',
    'Sara Clements',
    'Candice Frederick ',
    'Luke Hicks',
    'Jen Johans',
  ];

  const randomIndex =  getRandomInteger(0, writers.length-1);
  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    'Daniel Day-Lewis',
    'Heath Ledger',
    'Robert Downey Jr.',
    'Sean Connery',
    'Liam Neeson',
  ];

  const randomIndex =  getRandomInteger(0, actors.length-1);
  return actors[randomIndex];
};

const data = 'xxxDAYJSxxx';
const runtime = `${getRandomInteger(10,280)}m`;

const generateReleaseCountry = () => {
  const releaseCountry = [
    'Canada',
    'Japan',
    'Germany',
    'Switzerland',
    'Australia',
  ];

  const randomIndex =  getRandomInteger(0, releaseCountry.length-1);
  return releaseCountry[randomIndex];
};

const generateGenre = () => {
  const genre = [
    'Drama',
    'Comedy',
    'Action',
    'Fantasy',
    'Horror',
  ];

  const randomIndex =  getRandomInteger(0, genre.length-1);
  return genre[randomIndex];
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const copyAr = description.slice();
  const randomNumberSentences =  getRandomInteger(0, 4);

  const finaleState = [];
  for (let ind = 0; ind <= randomNumberSentences; ind++) {
    let reduction = ind+1;
    const randomIndex =  getRandomInteger(0, copyAr.length-reduction);
    const removeInd = randomIndex;
    finaleState.push(description[removeInd]);
    copyAr.splice(removeInd,1);
    reduction += ind;
  }
  return finaleState.join(' ');
};

const generateFilmInfo = () => {
  const titleValue = generateTitle();
  const alternativeTitle = `${titleValue} random`;

  return {
    title: titleValue,
    alternativeTitle,
    poster: generatePoster(),
    ageRating,
    totalRating,
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      data,
      releaseCountry: generateReleaseCountry(),
    },
    runtime,
    genre: generateGenre(),
    description: generateDescription(),
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: 'xxxDAYJSxxx',
      favorite: false,
    },
  };
};

const numberOfCom = getRandomInteger(0,5);
const generateEmojiUrl = () => {
  const emojiUrl = [
    '../../markup/images/emoji/smile.png ',
    '../../markup/images/emoji/sleeping.png ',
    '../../markup/images/emoji/puke.png ',
    '../../markup/images/emoji/angry.png ',
  ];

  const randomIndex =  getRandomInteger(0, emojiUrl.length-1);
  return emojiUrl[randomIndex];
};

const generateAltEmojiUrl = () => {
  const altEmojiUrl = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex =  getRandomInteger(0, altEmojiUrl.length-1);
  return altEmojiUrl[randomIndex];
};

const generateCommentItself = () => {
  const commentItself = [
    `Frankly, my dear, I don't give a damn.`,
    `I'm going to make him an offer he can't refuse.`,
    `Toto, I've got a feeling we're not in Kansas anymore.`,
    `All right, Mr. DeMille, I'm ready for my close-up.`,
    `May the Force be with you.`,
  ];

  const randomIndex =  getRandomInteger(0, commentItself.length-1);
  return commentItself[randomIndex];
};

const generateComAuthor = () => {
  const comAuthor = [
    `Ilya O'Reilly`,
    'Albert',
    'Amir',
    'Felipe',
    'Ferdinand',
  ];

  const randomIndex =  getRandomInteger(0, comAuthor.length-1);
  return comAuthor[randomIndex];
};

const comDayTime = 'xxxDAYJSxxx';

// eslint-disable-next-line arrow-body-style
const generateFilmComments = () => {
  return {
    numberOfCom,
    emojiUrl: generateEmojiUrl(),
    altEmojiUrl: generateAltEmojiUrl(),
    commentItself: generateCommentItself(),
    comAuthor: generateComAuthor(),
    comDayTime,
  };
};

const localComment = 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.';
const localEmotion = 'smile';

// eslint-disable-next-line arrow-body-style
const generateLocalFeedback =  () => {
  return {
    localComment,
    localEmotion,
  };
};

export {generateFilmInfo, generateFilmComments, generateLocalFeedback};
