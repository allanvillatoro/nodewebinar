import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IMovie } from '../types/movie';
import { MovieReview } from './movie.review.entity';

@Entity('movies')
export class Movie {
  constructor(data: IMovie) {
    this.movieId = data?.movieId ?? uuidv4();
    this.title = data?.title;
    this.year = data?.year ?? null;
    this.country = data?.country ?? null;
    this.createdDate = data?.createdDate ?? new Date();
    this.updatedDate = data?.updatedDate ?? new Date();
  }

  @PrimaryGeneratedColumn('uuid', { name: 'movie_id' })
  movieId: string;

  @Column('text')
  title: string;

  @Column('int', { nullable: true })
  year: number;

  @Column('text', { nullable: true })
  country: string;

  @OneToMany(() => MovieReview, (movieReview) => movieReview.movie)
  movieReviews!: MovieReview[];

  @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
  updatedDate: Date;
}
