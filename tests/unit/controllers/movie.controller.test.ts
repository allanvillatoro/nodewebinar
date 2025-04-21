import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MovieController } from '../../../src/controllers/movie.controller';
import { MovieManager } from '../../../src/managers/movie.manager';
import {
  IMovie,
  IMovieWithRating,
  ITopFiveMovie,
} from '../../../src/types/movie';
import { IMovieReview } from '../../../src/types/movie.review';
import { v7 as uuidv7 } from 'uuid';

describe('MovieController', () => {
  let movieController: MovieController;
  let mockMovieManager: jest.Mocked<MovieManager>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockMovieManager = {
      addMovie: jest.fn(),
      updateMovie: jest.fn(),
      getTopFiveByRating: jest.fn(),
      getMovieById: jest.fn(),
      getAllMovies: jest.fn(),
      addMovieReview: jest.fn(),
      updateMovieReview: jest.fn(),
      getMovieReviewById: jest.fn(),
      getReviewsByMovieId: jest.fn(),
      deleteAllReviewsByMovieId: jest.fn(),
    } as any;

    movieController = new MovieController(mockMovieManager);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('addMovie', () => {
    it('should add a movie and return 201 status', async () => {
      const mockMovie: IMovie = {
        movieId: uuidv7(),
        title: 'Test Movie',
        year: 2023,
        country: 'USA',
      };

      mockRequest.body = mockMovie;
      mockMovieManager.addMovie.mockResolvedValue(mockMovie);

      await movieController.addMovie(
        mockRequest as Request<unknown, unknown, Partial<IMovie>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.addMovie).toHaveBeenCalledWith(mockMovie);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovie);
    });

    it('should call next with error when addMovie fails', async () => {
      const error = new Error('Test error');
      mockRequest.body = {};
      mockMovieManager.addMovie.mockRejectedValue(error);

      await movieController.addMovie(
        mockRequest as Request<unknown, unknown, Partial<IMovie>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie and return 200 status', async () => {
      const movieId = uuidv7();
      const updatedMovie: IMovie = {
        movieId,
        title: 'Updated Movie',
        year: 2023,
        country: 'USA',
      };

      mockRequest.params = { movieId };
      mockRequest.body = updatedMovie;
      mockMovieManager.updateMovie.mockResolvedValue(updatedMovie);

      await movieController.updateMovie(
        mockRequest as Request<{ movieId: string }, unknown, Partial<IMovie>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.updateMovie).toHaveBeenCalledWith(
        movieId,
        updatedMovie,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedMovie);
    });
  });

  describe('getTopFiveByRating', () => {
    it('should return top five movies by rating', async () => {
      const mockTopFive: ITopFiveMovie[] = [
        { movieId: uuidv7(), title: 'Movie 1', year: 2023, rating: 5 },
        { movieId: uuidv7(), title: 'Movie 2', year: 2023, rating: 4.5 },
      ];

      mockMovieManager.getTopFiveByRating.mockResolvedValue(mockTopFive);

      await movieController.getTopFiveByRating(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.getTopFiveByRating).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTopFive);
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by id', async () => {
      const movieId = uuidv7();
      const mockMovie: IMovieWithRating = {
        movieId,
        title: 'Test Movie',
        year: 2023,
        country: 'USA',
        rating: 4.5,
      };

      mockRequest.params = { movieId };
      mockMovieManager.getMovieById.mockResolvedValue(mockMovie);

      await movieController.getMovieById(
        mockRequest as Request<{ movieId: string }>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.getMovieById).toHaveBeenCalledWith(movieId);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovie);
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const mockMovies: IMovie[] = [
        {
          movieId: uuidv7(),
          title: 'Movie 1',
          year: 2023,
          country: 'USA',
        },
        {
          movieId: uuidv7(),
          title: 'Movie 2',
          year: 2023,
          country: 'USA',
        },
      ];

      mockMovieManager.getAllMovies.mockResolvedValue(mockMovies);

      await movieController.getAllMovies(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.getAllMovies).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovies);
    });
  });

  describe('addMovieReview', () => {
    it('should add a movie review and return 201 status', async () => {
      const mockReview: IMovieReview = {
        movieReviewId: uuidv7(),
        movieId: uuidv7(),
        rating: 4.5,
        review: 'Great movie!',
      };

      mockRequest.body = mockReview;
      mockMovieManager.addMovieReview.mockResolvedValue(mockReview);

      await movieController.addMovieReview(
        mockRequest as Request<unknown, unknown, Partial<IMovieReview>>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.addMovieReview).toHaveBeenCalledWith(mockReview);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('updateMovieReview', () => {
    it('should update a movie review and return 200 status', async () => {
      const reviewId = uuidv7();
      const updatedReview: IMovieReview = {
        movieReviewId: reviewId,
        movieId: uuidv7(),
        rating: 5,
        review: 'Updated review',
      };

      mockRequest.params = { movieReviewId: reviewId };
      mockRequest.body = updatedReview;
      mockMovieManager.updateMovieReview.mockResolvedValue(updatedReview);

      await movieController.updateMovieReview(
        mockRequest as Request<
          { movieReviewId: string },
          unknown,
          Partial<IMovieReview>
        >,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.updateMovieReview).toHaveBeenCalledWith(
        reviewId,
        updatedReview,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedReview);
    });
  });

  describe('getMovieReviewById', () => {
    it('should return a movie review by id', async () => {
      const reviewId = uuidv7();
      const mockReview: IMovieReview = {
        movieReviewId: reviewId,
        movieId: uuidv7(),
        rating: 4.5,
        review: 'Test review',
      };

      mockRequest.params = { movieReviewId: reviewId };
      mockMovieManager.getMovieReviewById.mockResolvedValue(mockReview);

      await movieController.getMovieReviewById(
        mockRequest as Request<{ movieReviewId: string }>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.getMovieReviewById).toHaveBeenCalledWith(
        reviewId,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('getReviewsByMovieId', () => {
    it('should return all reviews for a movie', async () => {
      const movieId = uuidv7();
      const mockReviews: IMovieReview[] = [
        {
          movieReviewId: uuidv7(),
          movieId,
          rating: 4.5,
          review: 'Review 1',
        },
        {
          movieReviewId: uuidv7(),
          movieId,
          rating: 5,
          review: 'Review 2',
        },
      ];

      mockRequest.params = { movieId };
      mockMovieManager.getReviewsByMovieId.mockResolvedValue(mockReviews);

      await movieController.getReviewsByMovieId(
        mockRequest as Request<{ movieId: string }>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.getReviewsByMovieId).toHaveBeenCalledWith(
        movieId,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockReviews);
    });
  });

  describe('deleteAllReviewsByMovieId', () => {
    it('should delete all reviews for a movie and return count', async () => {
      const movieId = uuidv7();
      const deletedCount = 2;

      mockRequest.params = { movieId };
      mockMovieManager.deleteAllReviewsByMovieId.mockResolvedValue(
        deletedCount,
      );

      await movieController.deleteAllReviewsByMovieId(
        mockRequest as Request<{ movieId: string }>,
        mockResponse as Response,
        mockNext,
      );

      expect(mockMovieManager.deleteAllReviewsByMovieId).toHaveBeenCalledWith(
        movieId,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({
        deletedReviews: deletedCount,
      });
    });
  });
});
