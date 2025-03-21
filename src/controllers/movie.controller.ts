import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MovieManager } from '../managers/movie.manager';
import { IMovie, IMovieWithRating, ITopFiveMovie } from '../types/movie';
import { IMovieReview } from '../types/movie.review';

export class MovieController {
  constructor(private movieManager: MovieManager) {}

  addMovie = async (
    req: Request<unknown, unknown, Partial<IMovie>>,
    res: Response<IMovie>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const savedMovie = await this.movieManager.addMovie(req.body);
      res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  };

  updateMovie = async (
    req: Request<{ movieId: string }, unknown, Partial<IMovie>>,
    res: Response<IMovie>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieId } = req.params;
      const updatedData = req.body;
      const movie = await this.movieManager.updateMovie(movieId, updatedData);
      res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  };

  getTopFiveByRating = async (
    req: Request,
    res: Response<ITopFiveMovie[]>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const movies = await this.movieManager.getTopFiveByRating();
      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  };

  getMovieById = async (
    req: Request<{ movieId: string }>,
    res: Response<IMovieWithRating>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieId } = req.params;
      const movie = await this.movieManager.getMovieById(movieId);
      res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  };

  getAllMovies = async (
    req: Request,
    res: Response<IMovie[]>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const movies = await this.movieManager.getAllMovies();
      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  };

  addMovieReview = async (
    req: Request<unknown, unknown, Partial<IMovieReview>>,
    res: Response<IMovieReview>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const savedMovie = await this.movieManager.addMovieReview(req.body);
      res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  };

  updateMovieReview = async (
    req: Request<{ movieReviewId: string }, unknown, Partial<IMovieReview>>,
    res: Response<IMovieReview>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieReviewId } = req.params;
      const updatedData = req.body;
      const movie = await this.movieManager.updateMovieReview(
        movieReviewId,
        updatedData,
      );
      res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  };

  getMovieReviewById = async (
    req: Request<{ movieReviewId: string }>,
    res: Response<IMovieReview>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieReviewId } = req.params;
      const review = await this.movieManager.getMovieReviewById(movieReviewId);
      res.status(StatusCodes.OK).json(review);
    } catch (error) {
      next(error);
    }
  };

  getReviewsByMovieId = async (
    req: Request<{ movieId: string }>,
    res: Response<IMovieReview[]>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieId } = req.params;
      const reviews = await this.movieManager.getReviewsByMovieId(movieId);
      res.status(StatusCodes.OK).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  deleteAllReviewsByMovieId = async (
    req: Request<{ movieId: string }>,
    res: Response<{ deletedReviews: number }>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movieId } = req.params;
      const deletedReviews =
        await this.movieManager.deleteAllReviewsByMovieId(movieId);
      res.status(StatusCodes.OK).json({ deletedReviews });
    } catch (error) {
      next(error);
    }
  };
}
