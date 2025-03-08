import { DataSource, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { IMovie, ITopFiveMovie } from '../types/movie';
import { IMovieRepository } from '../types/movie.repository';
import { NotFoundError } from '../types/error';

export class MovieRepository implements IMovieRepository {
  private repository: Repository<Movie>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Movie);
  }

  async add(movieData: Partial<IMovie>): Promise<IMovie> {
    return this.repository.save(new Movie(movieData));
  }

  async update(movieId: string, movieData: Partial<IMovie>): Promise<IMovie> {
    const movie = await this.repository.findOneBy({ movieId });
    if (!movie) throw new NotFoundError(`Movie not found ${movieId}`);
    Object.assign(movie, {
      ...movieData,
      updatedDate: new Date(),
    });
    return this.repository.save(movie);
  }

  async getById(movieId: string): Promise<IMovie | null> {
    return this.repository.findOneBy({ movieId });
  }

  async getByTitle(title: string): Promise<IMovie | null> {
    return this.repository.findOneBy({ title });
  }

  async getAll(): Promise<IMovie[]> {
    return this.repository.find({
      order: {
        year: 'DESC',
      },
      take: 20,
    });
  }

  async getTopFiveByRating(): Promise<ITopFiveMovie[]> {
    const results = await this.repository
      .createQueryBuilder('movie')
      .leftJoin('movie.movieReviews', 'review')
      .select([
        'movie.movieId AS id',
        'movie.title AS title',
        'movie.year AS year',
        'movie.country AS country',
        'AVG(review.rating) AS rating',
      ])
      .groupBy('movie.movieId')
      .having('AVG(review.rating) > 0')
      .orderBy('rating', 'DESC')
      .limit(5)
      .getRawMany();
    return results.map(({ id, title, year, country, rating }) => ({
      movieId: id,
      title,
      year,
      country,
      rating: Math.round(parseFloat(rating) * 100) / 100,
    }));
  }
}
