
const parseInfoToStatisticData = (films) => {
  const arrayOfWatchedMovies = films.slice().reduce((acc, item) => {
    if(item.userDetails.alreadyWatched) {
      acc.push(item);
    }
    return acc;
  }, []);

  const numberOfWatchedMovies = arrayOfWatchedMovies.length;

  const getRankData = () => {
    const title = () => {
      switch (true){
        case (numberOfWatchedMovies >= 1 && numberOfWatchedMovies <= 10):
          return 'novice';
        case (numberOfWatchedMovies >= 11 && numberOfWatchedMovies <= 20):
          return 'fan';
        case (numberOfWatchedMovies >= 21):
          return 'movie buff';
      }
    };

    return {
      isRank: numberOfWatchedMovies > 0,
      yourRank: title(),
    };
  };

  const getGenresStatistics = () => {
    const genresStatistics = new Map();

    arrayOfWatchedMovies.slice().forEach((film) => {
      film.genre.forEach((genre) => {
        const count = genresStatistics.has(genre) ? genresStatistics.get(genre) : 0;
        genresStatistics.set(genre, count + 1);
      });
    });

    const nameOfGenres = [];
    const watchCount = [];

    Array.from(genresStatistics)
      .sort(([, numberA], [, numberB]) => numberB - numberA)
      .forEach(([genre, count]) => {
        nameOfGenres.push(genre);
        watchCount.push(count);
      });

    return {
      favoriteGenre: nameOfGenres[0],

    };
  };

  const calculateTotalTime = () => {
    const time = [];

    arrayOfWatchedMovies.slice().forEach((film) => time.push(film.runtime));

    return {totalTime: time.reduce((acc, item) => acc + item)};
  };


  return Object.assign(
    {},
    {
      yourRank: '',
      isRank: true,
      totalTime: '',
      favoriteGenre: '',
      numberWatched: numberOfWatchedMovies,
    },
    getRankData(),
    getGenresStatistics(),
    calculateTotalTime(),
  );
};
