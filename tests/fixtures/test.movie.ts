import { IMovie } from '../../src/types/movie';

export const testMovieId = 'movie-id';
export const testMovie: Partial<IMovie> = {
  title: 'The Batman',
  year: 2022,
  country: 'USA',
};

export const testMovieList: Partial<IMovie>[] = [
  testMovie,
  {
    title: 'Lion',
    year: 2016,
    country: 'Australia',
  },
  {
    title: 'Taxi Driver',
    year: 1976,
    country: 'USA',
  },
];
