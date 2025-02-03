import { MovieManager } from '../../../src/managers/movie.manager';
import { MovieRepository } from '../../../src/repositories/movie.repository';
import { MovieReviewRepository } from '../../../src/repositories/movie.review.repository';
import { IMovie } from '../../../src/types/movie';
import { IMovieReview } from '../../../src/types/movie.review';
import {
  testMovie,
  testMovieId,
  testMovieList,
} from '../../fixtures/test.movie';
import {
  testMovieReview,
  testMovieReviewId,
  testMovieReviewList,
} from '../../fixtures/test.movie.review';

jest.mock('../../../src/repositories/movie.repository');
jest.mock('../../../src/repositories/movie.review.repository');

const MovieRepositoryMock = MovieRepository as jest.Mock;
const MovieReviewRepositoryMock = MovieReviewRepository as jest.Mock;
let manager: MovieManager;

beforeAll(() => {});

beforeEach(() => {
  jest.clearAllMocks();

  MovieRepositoryMock.prototype.add.mockImplementation(async () => {
    return {} as IMovie;
  });

  MovieRepositoryMock.prototype.update.mockImplementation(async () => {
    return {} as IMovie;
  });

  MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
    return testMovie;
  });

  MovieRepositoryMock.prototype.getAll.mockImplementation(async () => {
    return testMovieList;
  });

  MovieRepositoryMock.prototype.getTopFiveByRating.mockImplementation(
    async () => {
      return testMovieList;
    },
  );

  MovieReviewRepositoryMock.prototype.add.mockImplementation(async () => {
    return {} as IMovieReview;
  });

  MovieReviewRepositoryMock.prototype.update.mockImplementation(async () => {
    return {} as IMovieReview;
  });

  MovieReviewRepositoryMock.prototype.getById.mockImplementation(async () => {
    return testMovieReview;
  });

  MovieReviewRepositoryMock.prototype.getByMovieId.mockImplementation(
    async () => {
      return testMovieReviewList;
    },
  );

  MovieReviewRepositoryMock.prototype.deleteAllByMovieId.mockImplementation(
    async () => {
      return testMovieReviewList.length;
    },
  );

  manager = new MovieManager(
    MovieRepositoryMock.prototype,
    MovieReviewRepositoryMock.prototype,
  );
});

describe('MovieManager', () => {
  describe('addMovie', () => {
    test('should add a new movie', async () => {
      await manager.addMovie(testMovie);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledTimes(1);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledWith(testMovie);
    });
  });
  describe('updateMovie', () => {
    test('should update a movie', async () => {
      await manager.updateMovie(testMovieId, testMovie);
      expect(MovieRepositoryMock.prototype.update).toHaveBeenCalledTimes(1);
      expect(MovieRepositoryMock.prototype.update).toHaveBeenCalledWith(
        testMovieId,
        testMovie,
      );
    });
  });
  describe('getMovieById', () => {
    test('should get the movie with rating', async () => {
      MovieReviewRepositoryMock.prototype.getAverageByMovieId.mockImplementation(
        async () => {
          return 4.5;
        },
      );
      const result = await manager.getMovieById(testMovieId);
      expect(result).toStrictEqual({
        ...testMovie,
        rating: 4.5,
      });
    });
    test('should get the movie without rating', async () => {
      MovieReviewRepositoryMock.prototype.getAverageByMovieId.mockImplementation(
        async () => {
          return 0;
        },
      );
      const result = await manager.getMovieById(testMovieId);
      expect(result).toStrictEqual({
        ...testMovie,
      });
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      try {
        await manager.getMovieById(testMovieId);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) {
          expect(err.name).toBe('NotFoundError');
          if ('status' in err) {
            expect(err.status).toBe(404);
          }
        }
      }
    });
  });
  describe('getAllMovies', () => {
    test('should get all the movies', async () => {
      const result = await manager.getAllMovies();
      expect(result).toStrictEqual(testMovieList);
      expect(result.length).toBe(testMovieList.length);
    });
  });
  describe('getTopFiveByRating', () => {
    test('should get top five movies', async () => {
      const result = await manager.getTopFiveByRating();
      expect(result).toStrictEqual(testMovieList);
      expect(result.length).toBe(testMovieList.length);
    });
  });
  describe('addMovieReview', () => {
    test('should add a new movie review', async () => {
      await manager.addMovieReview(testMovieReview);
      expect(MovieReviewRepositoryMock.prototype.add).toHaveBeenCalledTimes(1);
      expect(MovieReviewRepositoryMock.prototype.add).toHaveBeenCalledWith(
        testMovieReview,
      );
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      try {
        await manager.addMovieReview(testMovieReview);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) {
          expect(err.name).toBe('NotFoundError');
          if ('status' in err) {
            expect(err.status).toBe(404);
          }
        }
      }
      expect(MovieReviewRepositoryMock.prototype.add).toHaveBeenCalledTimes(0);
    });
  });
  describe('updateMovieReview', () => {
    test('should update movie review', async () => {
      await manager.updateMovieReview(testMovieReviewId, testMovieReview);
      expect(MovieReviewRepositoryMock.prototype.update).toHaveBeenCalledTimes(
        1,
      );
      expect(MovieReviewRepositoryMock.prototype.update).toHaveBeenCalledWith(
        testMovieReviewId,
        testMovieReview,
      );
    });
  });

  describe('getMovieReviewById', () => {
    test('should get movie review', async () => {
      const result = await manager.getMovieReviewById(testMovieReviewId);
      expect(result).toStrictEqual(testMovieReview);
    });
    test('should throw 404 error if movie review does not exist', async () => {
      MovieReviewRepositoryMock.prototype.getById.mockImplementation(
        async () => {
          return null;
        },
      );
      try {
        await manager.getMovieReviewById(testMovieReviewId);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) {
          expect(err.name).toBe('NotFoundError');
          if ('status' in err) {
            expect(err.status).toBe(404);
          }
        }
      }
    });
  });

  describe('getReviewsByMovieId', () => {
    test('should get reviews by movie', async () => {
      const result = await manager.getReviewsByMovieId(testMovieId);
      expect(result).toStrictEqual(testMovieReviewList);
      expect(result.length).toBe(testMovieReviewList.length);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      try {
        await manager.getReviewsByMovieId(testMovieId);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) {
          expect(err.name).toBe('NotFoundError');
          if ('status' in err) {
            expect(err.status).toBe(404);
          }
        }
      }
      expect(
        MovieReviewRepositoryMock.prototype.getByMovieId,
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteAllReviewsByMovieId', () => {
    test('should delete movie reviews', async () => {
      const result = await manager.deleteAllReviewsByMovieId(testMovieId);
      expect(result).toStrictEqual(testMovieReviewList.length);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      try {
        await manager.deleteAllReviewsByMovieId(testMovieId);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) {
          expect(err.name).toBe('NotFoundError');
          if ('status' in err) {
            expect(err.status).toBe(404);
          }
        }
      }
    });
  });
});
