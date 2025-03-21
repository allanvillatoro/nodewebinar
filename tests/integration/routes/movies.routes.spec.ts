import { ITopFiveMovie } from '../../../src/types/movie';
import { ratedMovieList } from '../../fixtures/test.movie';
import {
  closeTestDatabase,
  initializeTestDatabase,
  truncateTestDatabaseTables,
} from '../../testDatabase';
import { mockRequest } from '../../mockRequest';

beforeAll(async () => {
  await initializeTestDatabase();
  await truncateTestDatabaseTables();

  //Add any mocks to external services
});

beforeEach(async () => {
  //Add any mocks to external services
});

afterEach(async () => {
  await truncateTestDatabaseTables();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

afterAll(async () => {
  await closeTestDatabase();
});

describe('topfive', () => {
  test('should return top five movies ordered by rating', async () => {
    //Add 7 movies
    for (const movie of ratedMovieList) {
      await mockRequest({ path: '/api/movies', action: 'post', body: movie });
    }

    //Assure the 7 movies are added in the database
    const moviesResponse = await mockRequest({
      path: '/api/movies',
      action: 'get',
    });
    expect(moviesResponse.status).toBe(200);
    expect(moviesResponse.body.length).toBe(ratedMovieList.length);

    //Rate the movies
    //Avg: 4.2
    await rateMovie([5, 3, 3, 5, 5], 'Pulp Fiction');
    //Avg: 4.8
    await rateMovie([5, 5, 5, 4, 5], 'The Dark Knight');
    //Avg: 4.4
    await rateMovie([5, 3, 4, 5, 5], 'Parasite');
    //Avg: 3.6
    await rateMovie([5, 3, 3, 2, 5], 'Mad Max: Fury Road');
    //Avg: 4.6
    await rateMovie([5, 3, 5, 5, 5], 'The Godfather');
    //Avg: 3.75
    await rateMovie([5, 3, 5, 2], 'All Quiet on the Western Front');
    //The Shawshank Redemption does not have any ratings

    //Get the top five movies
    const topFiveResponse = await mockRequest({
      path: '/api/movies/topfive',
      action: 'get',
    });
    expect(topFiveResponse.status).toBe(200);
    expect(topFiveResponse.body.length).toBe(5);

    const mappedTopFive = topFiveResponse.body.map((movie: ITopFiveMovie) => ({
      title: movie.title,
      rating: movie.rating,
    }));

    //Assure top five is accurate
    expect(mappedTopFive).toStrictEqual([
      {
        title: 'The Dark Knight',
        rating: 4.8,
      },
      {
        title: 'The Godfather',
        rating: 4.6,
      },
      {
        title: 'Parasite',
        rating: 4.4,
      },
      {
        title: 'Pulp Fiction',
        rating: 4.2,
      },
      {
        title: 'All Quiet on the Western Front',
        rating: 3.75,
      },
    ]);
  });
});

async function rateMovie(ratings: number[], movieTitle: string) {
  for (const rating of ratings) {
    await mockRequest({
      path: '/api/movies/reviews',
      action: 'post',
      body: {
        movieId: ratedMovieList.find((movie) => movie.title === movieTitle)
          ?.movieId,
        rating,
      },
    });
  }
}
