import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Movie } from './movie.entity';
import { IMovieReview } from '../types/movie.review';

@Entity('movie_reviews')
export class MovieReview {
  constructor(data: Partial<IMovieReview>) {
    this.movieReviewId = data?.movieReviewId ?? uuidv7();
    this.movieId = data?.movieId ?? '';
    this.rating = data?.rating ?? 1;
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
  review: string | null;

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
  updatedDate: Date;

  @BeforeInsert()
  generateUuid() {
    this.movieReviewId = uuidv7();
  }
}
