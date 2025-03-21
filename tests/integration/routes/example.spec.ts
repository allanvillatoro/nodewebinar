import {
  closeTestDatabase,
  initializeTestDatabase,
  truncateTestDatabaseTables,
} from '../../testDatabase';
import { mockRequest } from '../../mockRequest';
import { testMovie } from '../../fixtures/test.movie';
import { IMovie } from '../../../src/types/movie';

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

describe('movies', () => {
  test('should save movie', async () => {
    //Add one movie
    await mockRequest({ path: '/api/movies', action: 'post', body: testMovie });

    //Get the movies
    const moviesResponse = await mockRequest({
      path: '/api/movies',
      action: 'get',
    });

    //Verify the movie was added
    expect(moviesResponse.body.length).toBe(1);
    const result: IMovie = moviesResponse.body[0];
    expect(result.title).toBe(testMovie.title);
    expect(result.year).toBe(testMovie.year);
    expect(result.country).toBe(testMovie.country);
  });
});
