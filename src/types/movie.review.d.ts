export interface IMovieReview {
  movieReviewId: string;
  rating: number;
  review: string | null;
  createdDate?: Date;
  updatedDate?: Date;
  movieId: string;
}
