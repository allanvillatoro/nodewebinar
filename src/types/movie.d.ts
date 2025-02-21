import { IMovieReview } from './movie.review';

export interface IMovie {
  movieId: string;
  title: string;
  year: number | null;
  country: string | null;
  createdDate?: Date;
  updatedDate?: Date;
}

export type ITopFiveMovie = Pick<IMoview, 'movieId' | 'title' | 'year'> &
  Pick<IMovieReview, 'rating'>;

export type IMovieWithRating = IMovie & Pick<IMovieReview, 'rating'>;
