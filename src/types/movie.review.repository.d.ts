export interface IMovieReviewRepository {
  add(movieReviewData: Partial<IMovieReview>): Promise<IMovieReview>;
  update(
    movieReviewId: string,
    updateData: Partial<IMovieReview>,
  ): Promise<IMovieReview>;
  getById(movieReviewId: string): Promise<IMovieReview | null>;
  getByMovieId(movieId: string): Promise<Partial<IMovieReview>[]>;
  deleteAllByMovieId(movieId: string): Promise<number>;
  getAverageByMovieId(movieId: string): Promise<number | null>;
}
