import { IMovieReview } from '../../src/types/movie.review';

export const testMovieReviewId = 'movie-review-id';
export const testMovieReview: IMovieReview = {
  movieReviewId: testMovieReviewId,
  movieId: 'movie-id',
  rating: 5,
  review: 'Great movie',
};

export const testMovieReviewList: IMovieReview[] = [
  testMovieReview,
  {
    movieReviewId: testMovieReviewId,
    movieId: 'movie-id',
    rating: 4,
    review: 'Good movie',
  },
  {
    movieReviewId: testMovieReviewId,
    movieId: 'movie-id',
    rating: 5,
    review: 'Excellente movie',
  },
];
