import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from './movie.entity';
import { IMovieReview } from '../types/movie.review';

@Entity('movie_reviews')
export class MovieReview {
  constructor(data: IMovieReview) {
    this.movieReviewId = data?.movieReviewId ?? uuidv4();
    this.movieId = data?.movieId;
    this.rating = data?.rating;
    this.review = data?.review ?? null;
    this.createdDate = data?.createdDate ?? new Date();
    this.updatedDate = data?.updatedDate ?? new Date();
  }

  @PrimaryGeneratedColumn('uuid', { name: 'movie_review_id' })
  movieReviewId: string;

  @Column({ name: 'movie_id', type: 'uuid' })
  movieId: string;

  @ManyToOne(() => Movie, (movie) => movie.movieReviews)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @Column('int')
  rating: number;

  @Column('text', { nullable: true })
  review: string;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
  updatedDate: Date;
}
