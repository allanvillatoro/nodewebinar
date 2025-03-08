import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { MovieReview } from '../entities/movie.review.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'Secret1234',
  database: process.env.DB_DATABASE ?? 'localdb',
  synchronize: true,
  logging: false,
  entities: [Movie, MovieReview],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    //throw error;
  }
};
