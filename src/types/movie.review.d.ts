export interface IMovieReview {
  movieReviewId: string;
  rating: number;
  review: string;
  createdDate?: Date;
  updatedDate?: Date;
  movieId: string;
}
