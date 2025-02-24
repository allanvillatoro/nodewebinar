import { ITopFiveMovie } from './movie';

export interface IMovieRepository {
  add(movieData: Partial<IMovie>): Promise<IMovie>;
  update(movieId: string, movieData: Partial<IMovie>): Promise<IMovie>;
  getById(movieId: string): Promise<IMovie | null>;
  getByTitle(title: string): Promise<IMovie | null>;
  getAll(): Promise<IMovie[]>;
  getTopFiveByRating(): Promise<ITopFiveMovie[]>;
}
