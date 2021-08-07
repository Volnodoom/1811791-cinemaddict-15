import { getRandomInteger, getRandomPositiveFloat } from '../other/utils.js';
/* eslint-disable quotes */

const giveFewPositionsFromArrayNames = (array) => {
  const copyAr = array.slice();
  const randomNumberSentences =  getRandomInteger(0, 4);
  let reduction = 0;

  const finaleState = [];
  for (let ind = 0; ind <= randomNumberSentences; ind++) {
    const removeInd =  getRandomInteger(0, copyAr.length-1-reduction);
    finaleState.push(copyAr[removeInd]);
    copyAr.splice(removeInd,1);
    reduction += 1;
  }

  return finaleState;
};

const giveFewPositionsFromArraySentences = (array) => {
  const copyAr = array.slice();
  const randomNumberSentences =  getRandomInteger(0, 4);

  const finaleState = [];
  for (let ind = 0; ind <= randomNumberSentences; ind++) {
    let reduction = ind+1;
    const randomIndex =  getRandomInteger(0, copyAr.length-reduction);
    const removeInd = randomIndex;
    finaleState.push(copyAr[removeInd]);
    copyAr.splice(removeInd,1);
    reduction += 1;
  }
  return finaleState.join(' ');
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
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex =  getRandomInteger(0, poster.length-1);
  return poster[randomIndex];
};

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

  return giveFewPositionsFromArrayNames(writers);
};

const generateActors = () => {
  const actors = [
    'Daniel Day-Lewis',
    'Heath Ledger',
    'Robert Downey Jr.',
    'Sean Connery',
    'Liam Neeson',
  ];

  return giveFewPositionsFromArrayNames(actors);
};

const generateData = () => {
  const data = [
    '2019-04-12T16:12:32.554Z',
    '2019-05-11T00:00:00.000Z',
    '2020-07-09T00:00:00.276Z',
    '2020-12-17T00:00:00.000Z',
    '2021-01-18T00:00:00.000Z',
  ];

  const randomIndex =  getRandomInteger(0, data.length-1);
  return data[randomIndex];
};

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

  return giveFewPositionsFromArrayNames(genre);
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

  return giveFewPositionsFromArraySentences(description);
};

const generateEmotion = () => {
  const emotion = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex =  getRandomInteger(0, emotion.length-1);
  return emotion[randomIndex];
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

const generateFilmComments = () => {
  const randomNumberComments =  getRandomInteger(0, 4);

  const finaleNumberOfComments = [];
  for (let ind = 0; ind <= randomNumberComments; ind++) {
    finaleNumberOfComments.push(
      {
        commentItself: generateCommentItself(),
        comAuthor: generateComAuthor(),
        comDayTime: generateData(),
        emotion: generateEmotion(),
      },
    );
  }
  return finaleNumberOfComments;
};

const generateFilmInfo = () => {
  const titleValue = generateTitle();
  const alternativeTitle = `${titleValue} random`;

  return {
    title: titleValue,
    alternativeTitle,
    poster: generatePoster(),
    ageRating: `${getRandomInteger(6,18)}+`,
    totalRating: getRandomPositiveFloat(1,10,2),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      data: generateData(),
      releaseCountry: generateReleaseCountry(),
    },
    runtime: getRandomInteger(10,280),
    genre: generateGenre(),
    description: generateDescription(),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0,1)),
      alreadyWatched: Boolean(getRandomInteger(0,1)),
      watchingDate: generateData(),
      favorite: Boolean(getRandomInteger(0,1)),
    },
    comments: generateFilmComments(),
  };
};

export {generateFilmInfo};
