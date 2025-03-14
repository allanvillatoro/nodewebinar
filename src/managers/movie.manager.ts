import { BadRequestError, ConflictError, NotFoundError } from '../types/error';
import { IMovie, IMovieWithRating, ITopFiveMovie } from '../types/movie';
import { IMovieRepository } from '../types/movie.repository';
import { IMovieReview } from '../types/movie.review';
import { IMovieReviewRepository } from '../types/movie.review.repository';

export class MovieManager {
  private movieRepository: IMovieRepository;
  private movieReviewRepository: IMovieReviewRepository;

  //private name: string;

  constructor(
    movieRepository: IMovieRepository,
    movieReviewRepository: IMovieReviewRepository,
  ) {
    this.movieRepository = movieRepository;
    this.movieReviewRepository = movieReviewRepository;
  }

  async addMovie(movieData: Partial<IMovie>): Promise<IMovie> {
    const foundMovie = await this.movieRepository.getByTitle(movieData.title!);
    if (foundMovie) {
      throw new ConflictError(`${movieData.title} movie already exists`);
    }
    return this.movieRepository.add(movieData);
  }

  async updateMovie(
    movieId: string,
    movieData: Partial<IMovie>,
  ): Promise<IMovie> {
    return this.movieRepository.update(movieId, movieData);
  }

  async getMovieById(movieId: string): Promise<IMovieWithRating> {
    const movie = await this.movieRepository.getById(movieId);
    if (!movie) throw new NotFoundError(`Movie not found ${movieId}`);

    const rating =
      await this.movieReviewRepository.getAverageByMovieId(movieId);
    if (!rating) return movie;

    return { ...movie, rating };
  }

  async getAllMovies(): Promise<IMovie[]> {
    return this.movieRepository.getAll();
  }

  async getTopFiveByRating(): Promise<ITopFiveMovie[]> {
    return this.movieRepository.getTopFiveByRating();
  }

  async addMovieReview(
    movieReviewData: Partial<IMovieReview>,
  ): Promise<IMovieReview> {
    if (!movieReviewData.movieId)
      throw new BadRequestError(`movieId is required`);
    const movie = await this.movieRepository.getById(movieReviewData.movieId);
    if (!movie) {
      throw new NotFoundError(`Movie not found ${movieReviewData.movieId}`);
    }
    return this.movieReviewRepository.add(movieReviewData);
  }

  async updateMovieReview(
    movieReviewId: string,
    movieReviewData: Partial<IMovieReview>,
  ): Promise<IMovieReview> {
    return this.movieReviewRepository.update(movieReviewId, movieReviewData);
  }

  async getMovieReviewById(movieReviewId: string): Promise<IMovieReview> {
    const result = await this.movieReviewRepository.getById(movieReviewId);
    if (!result)
      throw new NotFoundError(`Movie review not found ${movieReviewId}`);
    return result;
  }

  async getReviewsByMovieId(movieId: string): Promise<IMovieReview[]> {
    const movie = await this.movieRepository.getById(movieId);
    if (!movie) {
      throw new NotFoundError(`Movie not found ${movieId}`);
    }
    return this.movieReviewRepository.getByMovieId(movieId);
  }

  async deleteAllReviewsByMovieId(movieId: string): Promise<number> {
    const movie = await this.movieRepository.getById(movieId);
    if (!movie) {
      throw new NotFoundError(`Movie not found ${movieId}`);
    }
    return this.movieReviewRepository.deleteAllByMovieId(movieId);
  }
}
