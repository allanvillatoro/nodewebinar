import { DataSource, Repository } from 'typeorm';
import { MovieReview } from '../entities/movie.review.entity';
import { NotFoundError } from '../types/error';
import { IMovieReview } from '../types/movie.review';
import { IMovieReviewRepository } from '../types/movie.review.repository';

export class MovieReviewRepository implements IMovieReviewRepository {
  private repository: Repository<MovieReview>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(MovieReview);
  }

  async add(movieReviewData: Partial<IMovieReview>): Promise<IMovieReview> {
    return this.repository.save(new MovieReview(movieReviewData));
  }

  async update(
    movieReviewId: string,
    updateData: Partial<IMovieReview>,
  ): Promise<IMovieReview> {
    const movieReview = await this.repository.findOneBy({ movieReviewId });
    if (!movieReview)
      throw new NotFoundError(`Movie review not found ${movieReviewId}`);
    Object.assign(movieReview, {
      ...updateData,
      updatedDate: new Date(),
    });
    return this.repository.save(movieReview);
  }

  async getById(movieReviewId: string): Promise<IMovieReview | null> {
    return this.repository.findOneBy({ movieReviewId });
  }

  async getByMovieId(movieId: string): Promise<Partial<IMovieReview>[]> {
    return this.repository.find({
      select: {
        movieReviewId: true,
        rating: true,
        review: true,
        movieId: true,
        createdDate: true,
        updatedDate: true,
      },
      where: { movieId },
      order: { createdDate: 'DESC' },
      take: 20,
    });
  }

  async deleteAllByMovieId(movieId: string): Promise<number> {
    const result = await this.repository.delete({ movieId });
    return result.affected ?? 0;
  }

  async getAverageByMovieId(movieId: string): Promise<number | null> {
    const result = await this.repository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.movieId = :movieId', { movieId })
      .getRawOne();
    return result?.average
      ? Math.round(parseFloat(result.average) * 100) / 100
      : null;
  }
}
