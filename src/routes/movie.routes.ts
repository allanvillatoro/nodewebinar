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

  constructor() {
    this.router = Router();
    this.movieController = new MovieController(
      new MovieManager(new MovieRepository(), new MovieReviewRepository()),
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // En el método routes()
    this.router.post(
      '/movies',
      validate(moviePostSchema),
      this.movieController.addMovie.bind(this.movieController),
    );
    this.router.put(
      '/movies/:movieId',
      validate(movieGetSchema, 'params'),
      validate(moviePutSchema),
      this.movieController.updateMovie.bind(this.movieController),
    );
    this.router.get(
      '/movies',
      this.movieController.getAllMovies.bind(this.movieController),
    );
    this.router.get(
      '/movies/topfive',
      this.movieController.getTopFiveByRating.bind(this.movieController),
    );
    this.router.get(
      '/movies/:movieId',
      validate(movieGetSchema, 'params'),
      this.movieController.getMovieById.bind(this.movieController),
    );

    //Reviews by Movie

    this.router.get(
      '/movies/:movieId/reviews',
      validate(movieGetSchema, 'params'),
      this.movieController.getReviewsByMovieId.bind(this.movieController),
    );

    this.router.delete(
      '/movies/:movieId/reviews',
      validate(movieGetSchema, 'params'),
      this.movieController.deleteAllReviewsByMovieId.bind(this.movieController),
    );

    //Movie Reviews

    this.router.post(
      '/moviereviews',
      validate(movieReviewPostSchema),
      this.movieController.addMovieReview.bind(this.movieController),
    );

    this.router.put(
      '/moviereviews/:movieReviewId',
      validate(movieReviewGetSchema, 'params'),
      validate(movieReviewPutSchema),
      this.movieController.updateMovieReview.bind(this.movieController),
    );

    this.router.get(
      '/moviereviews/:movieReviewId',
      validate(movieReviewGetSchema, 'params'),
      this.movieController.getMovieReviewById.bind(this.movieController),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
