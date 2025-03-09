import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MovieReview } from '../src/entities/movie.review.entity';
import { Movie } from '../src/entities/movie.entity';

export const testAppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'Secret1234',
  database: 'testdb',
  synchronize: true,
  logging: false,
  entities: [Movie, MovieReview],
  migrations: [],
  subscribers: [],
});

export const initializeTestDatabase = async () => {
  try {
    await testAppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    //throw error;
  }
};

export const closeTestDatabase = async () => {
  try {
    await testAppDataSource.destroy();
    console.log('Database closed successfully');
  } catch (error) {
    console.error('Error during Data Source shutdown', error);
    //throw error;
  }
};

export const truncateTestDatabaseTables = async () => {
  try {
    await testAppDataSource.manager.query(
      'TRUNCATE TABLE "movie_reviews" RESTART IDENTITY CASCADE',
    );
    await testAppDataSource.manager.query(
      'TRUNCATE TABLE "movies" RESTART IDENTITY CASCADE',
    );
    console.log('Database cleaned up successfully');
  } catch (error) {
    console.error('Error during Data Source cleanup', error);
    //throw error;
  }
};
