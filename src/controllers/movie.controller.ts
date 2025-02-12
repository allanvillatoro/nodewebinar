import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MovieManager } from '../managers/movie.manager';

export class MovieController {
  constructor(private movieManager: MovieManager) {}

  async addMovie(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const savedMovie = await this.movieManager.addMovie(req.body);
      res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { movieId } = req.params;
      const updatedData = req.body;
      const movie = await this.movieManager.updateMovie(movieId, updatedData);
      res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getTopFiveByRating(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const movies = await this.movieManager.getTopFiveByRating();
      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { movieId } = req.params;
      const movie = await this.movieManager.getMovieById(movieId);
      res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAllMovies(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const movies = await this.movieManager.getAllMovies();
      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async addMovieReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const savedMovie = await this.movieManager.addMovieReview(req.body);
      res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  }

  async updateMovieReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
  }

  async getMovieReviewById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { movieReviewId } = req.params;
      const review = await this.movieManager.getMovieReviewById(movieReviewId);
      res.status(StatusCodes.OK).json(review);
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByMovieId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { movieId } = req.params;
      const reviews = await this.movieManager.getReviewsByMovieId(movieId);
      res.status(StatusCodes.OK).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllReviewsByMovieId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { movieId } = req.params;
      const deletedReviews =
        await this.movieManager.deleteAllReviewsByMovieId(movieId);
      res.status(StatusCodes.OK).json({ deletedReviews });
    } catch (error) {
      next(error);
    }
  }
}
