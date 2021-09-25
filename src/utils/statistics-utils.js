import { StatisticsPeriodValue } from '../const.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const MINUTES = 60;

export const parseInfoToStatisticData = (films, selectedPeriod = StatisticsPeriodValue.ALL) => {
  const emptyState = {
    'selectedPeriod': selectedPeriod,
    yourRank: 0,
    isRank: false,
    htmlTimeLine:  '0 <span class="statistic__item-description">h</span> 0 <span class="statistic__item-description">m</span>',
    favoriteGenre: '',
    numberWatched: 0,
  };

  const arrayOfWatchedMovies = films.slice().reduce((acc, item) => {
    if(item.userDetails.alreadyWatched) {
      acc.push(item);
    }
    return acc;
  }, []);

  if (arrayOfWatchedMovies.length < 1 || arrayOfWatchedMovies.length === null) {
    return emptyState;
  }

  const statisticMovieFilter = (watchedFilms) => {
    switch (selectedPeriod) {
      case StatisticsPeriodValue.ALL:
        return watchedFilms.slice();
      case StatisticsPeriodValue.TODAY:
        return watchedFilms.filter((watchedFilm) => dayjs(watchedFilm.userDetails.watchingDate).isSame(dayjs(), 'day'));
      case StatisticsPeriodValue.WEEK:
        return watchedFilms.filter((watchedFilm) => dayjs(watchedFilm.userDetails.watchingDate).isBetween(dayjs().add(-6, 'day'), dayjs(), 'day', '[]'));
      case StatisticsPeriodValue.MONTH:
        return watchedFilms.filter((watchedFilm) => dayjs(watchedFilm.userDetails.watchingDate).isBetween(dayjs().add(-29, 'day'), dayjs(), 'day', '[]'));
      case StatisticsPeriodValue.YEAR:
        return watchedFilms.filter((watchedFilm) => dayjs(watchedFilm.userDetails.watchingDate).isBetween(dayjs().add(-364, 'day'), dayjs(), 'day', '[]'));
    }
  };

  const numberOfWatchedMovies = statisticMovieFilter(arrayOfWatchedMovies).length;

  if (numberOfWatchedMovies < 1) {
    return emptyState;
  }

  const getRankData = () => {
    const title = () => {
      switch (true){
        case (arrayOfWatchedMovies.length >= 1 && arrayOfWatchedMovies.length <= 10):
          return 'Novice';
        case (arrayOfWatchedMovies.length >= 11 && arrayOfWatchedMovies.length <= 20):
          return 'Fan';
        case (arrayOfWatchedMovies.length >= 21):
          return 'Movie buff';
      }
    };

    return {
      isRank: numberOfWatchedMovies > 0,
      yourRank: title(),
    };
  };

  const getGenresStatistics = () => {
    const genresStatistics = new Map();

    statisticMovieFilter(arrayOfWatchedMovies).slice().forEach((film) => {
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
      listOfGenres: nameOfGenres,
      'watchCount': watchCount,
    };
  };

  const calculateHtmlTimeLine = () => {
    const time = [];

    statisticMovieFilter(arrayOfWatchedMovies).slice().forEach((film) => time.push(film.runtime));
    const resultedTimeMinutes = time.reduce((acc, item) => acc + item);

    const calculateTimeToHandM = (totalTimeMinutes) => {
      const hours = Math.trunc(totalTimeMinutes/MINUTES);
      let hoursTimeLine = '';
      let minutesTimeLine = '';
      const timeConditions = [
        totalTimeMinutes < MINUTES,
        totalTimeMinutes === MINUTES,
        totalTimeMinutes > MINUTES,
      ];

      switch (true) {
        case timeConditions[0]:
          hoursTimeLine = '';
          minutesTimeLine = `${totalTimeMinutes} <span class="statistic__item-description">m</span>`;
          break;
        case timeConditions[1]:
          hoursTimeLine = '1 <span class="statistic__item-description">h</span>';
          minutesTimeLine = '';
          break;
        case timeConditions[2]:
          hoursTimeLine = `${hours} <span class="statistic__item-description">h</span>`;
          minutesTimeLine = `${totalTimeMinutes-hours*MINUTES} <span class="statistic__item-description">m</span>`;
          break;
      }

      return (`<p class="statistic__item-text">
        ${hoursTimeLine}
        ${minutesTimeLine}
      </p>`);
    };

    return calculateTimeToHandM(resultedTimeMinutes);
  };

  return Object.assign(
    {},
    {
      'selectedPeriod': selectedPeriod,
      yourRank: '',
      isRank: false,
      htmlTimeLine: calculateHtmlTimeLine(),
      favoriteGenre: '',
      numberWatched: numberOfWatchedMovies,
    },
    getRankData(),
    getGenresStatistics(),

  );
};

export const rankTitle = (films) => {
  const watchedFilmCount = films.slice().reduce((acc, item) => {
    if(item.userDetails.alreadyWatched) {
      acc.push(item);
    }
    return acc;
  }, []);

  switch (true){
    case (watchedFilmCount.length === 0):
      return 0;
    case (watchedFilmCount.length >= 1 && watchedFilmCount.length <= 10):
      return 'Novice';
    case (watchedFilmCount.length >= 11 && watchedFilmCount.length <= 20):
      return 'Fan';
    case (watchedFilmCount.length >= 21):
      return 'Movie buff';
  }
};
