import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { MovieController } from '../controllers/movie.controller';
import { MovieManager } from '../managers/movie.manager';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieReviewRepository } from '../repositories/movie.review.repository';
import {
  movieGetSchema,
  moviePostSchema,
  moviePutSchema,
  movieReviewGetSchema,
  movieReviewPostSchema,
  movieReviewPutSchema,
} from '../schemas/movie.schema';

export class MovieRouter {
  private router: Router;
  private movieController: MovieController;
  private readonly baseRoute = '/movies';

  constructor() {
    this.router = Router();
    this.movieController = new MovieController(
      new MovieManager(new MovieRepository(), new MovieReviewRepository()),
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Movies

    this.router.post(
      this.baseRoute,
      validate(moviePostSchema),
      this.movieController.addMovie,
    );
    this.router.put(
      `${this.baseRoute}/:movieId`,
      validate(movieGetSchema, 'params'),
      validate(moviePutSchema),
      this.movieController.updateMovie,
    );
    this.router.get(
      `${this.baseRoute}/topfive`,
      this.movieController.getTopFiveByRating,
    );
    this.router.get(
      `${this.baseRoute}/:movieId`,
      validate(movieGetSchema, 'params'),
      this.movieController.getMovieById,
    );
    this.router.get(this.baseRoute, this.movieController.getAllMovies);

    // Movie Reviews

    this.router.post(
      `${this.baseRoute}/reviews`,
      validate(movieReviewPostSchema),
      this.movieController.addMovieReview,
    );

    this.router.put(
      `${this.baseRoute}/reviews/:movieReviewId`,
      validate(movieReviewGetSchema, 'params'),
      validate(movieReviewPutSchema),
      this.movieController.updateMovieReview,
    );

    this.router.get(
      `${this.baseRoute}/reviews/:movieReviewId`,
      validate(movieReviewGetSchema, 'params'),
      this.movieController.getMovieReviewById,
    );

    // Reviews by Movie

    this.router.get(
      `${this.baseRoute}/:movieId/reviews`,
      validate(movieGetSchema, 'params'),
      this.movieController.getReviewsByMovieId,
    );

    this.router.delete(
      `${this.baseRoute}/:movieId/reviews`,
      validate(movieGetSchema, 'params'),
      this.movieController.deleteAllReviewsByMovieId,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
