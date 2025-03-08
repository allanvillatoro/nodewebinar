import { IMovie } from '../../src/types/movie';
import { v7 as uuidv7 } from 'uuid';

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

export const ratedMovieList: Partial<IMovie>[] = [
  {
    movieId: uuidv7(),
    title: 'The Shawshank Redemption',
    year: 1994,
    country: 'USA',
  },
  {
    movieId: uuidv7(),
    title: 'The Godfather',
    year: 1972,
    country: 'USA',
  },
  {
    movieId: uuidv7(),
    title: 'The Dark Knight',
    year: 2008,
    country: 'USA',
  },
  {
    movieId: uuidv7(),
    title: 'Pulp Fiction',
    year: 1994,
    country: 'USA',
  },
  {
    movieId: uuidv7(),
    title: 'Parasite',
    year: 2019,
    country: 'South Korea',
  },
  {
    movieId: uuidv7(),
    title: 'All Quiet on the Western Front',
    year: 2022,
    country: 'Germany',
  },
  {
    movieId: uuidv7(),
    title: 'Mad Max: Fury Road',
    year: 2015,
    country: 'Australia',
  },
];
