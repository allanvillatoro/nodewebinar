// Tips for Writing Unit Tests with Jest
//
// General Guidelines:
// Follow the principles of Single Responsibility, Separation of Concerns,
// and Dependency Injection in your classes and functions to make testing easier.
//
// Steps:
// 1 - Group related tests using describe blocks to improve organization and readability
// 2 - Call the method under test inside an it or test block
// 3 - Mock dependencies such as database connections, API calls, or third-party services to keep tests isolated
// 4 - Use assertions (expect) to verify the expected behavior and outputs
// 5 - Move setup code to beforeAll if it should run once before all tests
// 6 - Use beforeEach if it should run before each test case
// Check out the documentation for more details (./docs/UNIT_TESTS.md)

import { MovieManager } from '../../../src/managers/movie.manager';
import { MovieRepository } from '../../../src/repositories/movie.repository';
import { MovieReviewRepository } from '../../../src/repositories/movie.review.repository';
import { IMovie } from '../../../src/types/movie';
import { testMovie, testMovieList } from '../../fixtures/test.movie';

jest.mock('../../../src/repositories/movie.repository');

const MovieRepositoryMock = MovieRepository as jest.Mock;
let manager: MovieManager;

beforeAll(() => {
  MovieRepositoryMock.prototype.add.mockImplementation(async () => {
    return {} as IMovie;
  });

  MovieRepositoryMock.prototype.getByTitle.mockImplementation(async () => {
    return null;
  });

  MovieRepositoryMock.prototype.getAll.mockImplementation(async () => {
    return testMovieList;
  });

  manager = new MovieManager(
    MovieRepositoryMock.prototype,
    MovieReviewRepository.prototype,
  );
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('example', () => {
  describe('getAllMovies', () => {
    test('should get all the movies', async () => {
      const result = await manager.getAllMovies();
      expect(MovieRepositoryMock.prototype.getAll).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(testMovieList);
      expect(result.length).toBe(testMovieList.length);
    });
  });
  describe('addMovie', () => {
    test('should add a new movie', async () => {
      await manager.addMovie(testMovie);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledTimes(1);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledWith(testMovie);
    });
  });
});
