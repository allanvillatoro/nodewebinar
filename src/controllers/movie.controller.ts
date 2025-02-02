/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MovieManager } from '../managers/movie.manager';

export class MovieController {
  constructor(private movieManager: MovieManager) {}

  async addMovie(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const savedMovie = await this.movieManager.addMovie(req.body);
      return res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieId } = req.params;
      const updatedData = req.body;
      const movie = await this.movieManager.updateMovie(movieId, updatedData);
      return res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getTopFiveByRating(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const movies = await this.movieManager.getTopFiveByRating();
      return res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieId } = req.params;
      const movie = await this.movieManager.getMovieById(movieId);
      return res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAllMovies(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const movies = await this.movieManager.getAllMovies();
      return res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async addMovieReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const savedMovie = await this.movieManager.addMovieReview(req.body);
      return res.status(StatusCodes.CREATED).json(savedMovie);
    } catch (error) {
      next(error);
    }
  }

  async updateMovieReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieReviewId } = req.params;
      const updatedData = req.body;
      const movie = await this.movieManager.updateMovieReview(
        movieReviewId,
        updatedData,
      );
      return res.status(StatusCodes.OK).json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getMovieReviewById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieReviewId } = req.params;
      const review = await this.movieManager.getMovieReviewById(movieReviewId);
      return res.status(StatusCodes.OK).json(review);
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByMovieId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieId } = req.params;
      const reviews = await this.movieManager.getReviewsByMovieId(movieId);
      return res.status(StatusCodes.OK).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllReviewsByMovieId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { movieId } = req.params;
      const deletedReviews =
        await this.movieManager.deleteAllReviewsByMovieId(movieId);
      return res.status(StatusCodes.OK).json({ deletedReviews });
    } catch (error) {
      next(error);
    }
  }
}
