import { MovieManager } from '../../../src/managers/movie.manager';
import { MovieRepository } from '../../../src/repositories/movie.repository';
import { MovieReviewRepository } from '../../../src/repositories/movie.review.repository';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../../../src/types/error';
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

beforeAll(() => {
  MovieRepositoryMock.prototype.add.mockImplementation(async () => {
    return {} as IMovie;
  });

  MovieRepositoryMock.prototype.update.mockImplementation(async () => {
    return {} as IMovie;
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

beforeEach(() => {
  jest.clearAllMocks();

  MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
    return testMovie;
  });

  MovieRepositoryMock.prototype.getByTitle.mockImplementation(async () => {
    return null;
  });

  MovieReviewRepositoryMock.prototype.getById.mockImplementation(async () => {
    return testMovieReview;
  });
});

describe('MovieManager', () => {
  describe('addMovie', () => {
    test('should add a new movie', async () => {
      await manager.addMovie(testMovie);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledTimes(1);
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledWith(testMovie);
    });
    test('should throw 409 error if movie title already exists', async () => {
      MovieRepositoryMock.prototype.getByTitle.mockImplementation(async () => {
        return {} as IMovie;
      });
      await expect(manager.addMovie(testMovie)).rejects.toThrow(
        new ConflictError(`${testMovie.title} movie already exists`),
      );
      expect(MovieRepositoryMock.prototype.add).toHaveBeenCalledTimes(0);
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
      expect(
        MovieReviewRepositoryMock.prototype.getAverageByMovieId,
      ).toHaveBeenCalledTimes(1);
      expect(MovieRepositoryMock.prototype.getById).toHaveBeenCalledTimes(1);
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
      expect(MovieRepositoryMock.prototype.getById).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(testMovie);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      await expect(manager.getMovieById(testMovieId)).rejects.toThrow(
        new NotFoundError(`Movie not found ${testMovieId}`),
      );
      expect(
        MovieReviewRepositoryMock.prototype.getAverageByMovieId,
      ).toHaveBeenCalledTimes(0);
    });
  });
  describe('getAllMovies', () => {
    test('should get all the movies', async () => {
      const result = await manager.getAllMovies();
      expect(MovieRepositoryMock.prototype.getAll).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(testMovieList);
      expect(result.length).toBe(testMovieList.length);
    });
  });
  describe('getTopFiveByRating', () => {
    test('should get top five movies', async () => {
      const result = await manager.getTopFiveByRating();
      expect(
        MovieRepositoryMock.prototype.getTopFiveByRating,
      ).toHaveBeenCalledTimes(1);
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
    test('should throw 400 error if movie id is not provided', async () => {
      const testMovieReview = {
        rating: 5,
        review: 'Great movie',
      };
      await expect(manager.addMovieReview(testMovieReview)).rejects.toThrow(
        new BadRequestError(`movieId is required`),
      );
      expect(MovieReviewRepositoryMock.prototype.add).toHaveBeenCalledTimes(0);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      await expect(manager.addMovieReview(testMovieReview)).rejects.toThrow(
        new NotFoundError(`Movie not found ${testMovieId}`),
      );
      expect(
        MovieReviewRepositoryMock.prototype.getByMovieId,
      ).toHaveBeenCalledTimes(0);
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
      expect(MovieReviewRepositoryMock.prototype.getById).toHaveBeenCalledTimes(
        1,
      );
      expect(result).toStrictEqual(testMovieReview);
    });
    test('should throw 404 error if movie review does not exist', async () => {
      MovieReviewRepositoryMock.prototype.getById.mockImplementation(
        async () => {
          return null;
        },
      );
      await expect(
        manager.getMovieReviewById(testMovieReviewId),
      ).rejects.toThrow(
        new NotFoundError(`Movie review not found ${testMovieReviewId}`),
      );
    });
  });

  describe('getReviewsByMovieId', () => {
    test('should get reviews by movie', async () => {
      const result = await manager.getReviewsByMovieId(testMovieId);
      expect(
        MovieReviewRepositoryMock.prototype.getByMovieId,
      ).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(testMovieReviewList);
      expect(result.length).toBe(testMovieReviewList.length);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      await expect(manager.getReviewsByMovieId(testMovieId)).rejects.toThrow(
        new NotFoundError(`Movie not found ${testMovieId}`),
      );
      expect(
        MovieReviewRepositoryMock.prototype.getByMovieId,
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteAllReviewsByMovieId', () => {
    test('should delete movie reviews', async () => {
      const result = await manager.deleteAllReviewsByMovieId(testMovieId);
      expect(
        MovieReviewRepositoryMock.prototype.deleteAllByMovieId,
      ).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(testMovieReviewList.length);
    });
    test('should throw 404 error if movie does not exist', async () => {
      MovieRepositoryMock.prototype.getById.mockImplementation(async () => {
        return null;
      });
      await expect(
        manager.deleteAllReviewsByMovieId(testMovieId),
      ).rejects.toThrow(new NotFoundError(`Movie not found ${testMovieId}`));
      expect(
        MovieReviewRepositoryMock.prototype.deleteAllByMovieId,
      ).toHaveBeenCalledTimes(0);
    });
  });
});
