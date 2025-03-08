/*import {
  closeTestDatabase,
  initializeTestDatabase,
  truncateTestDatabaseTables,
} from '../../testDatabase';
import { mockRequest } from '../../mockRequest';
import { testMovie } from '../../fixtures/test.movie';

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

test('example', async () => {
  //Add one movie
  await mockRequest({ path: '/api/movies', action: 'post', body: testMovie });

  //Get the movies
  const moviesResponse = await mockRequest({
    path: '/api/movies',
    action: 'get',
  });

  //Verify the movie was added
  expect(moviesResponse.body.length).toBe(1);
  expect(moviesResponse.body[0].title).toBe(testMovie.title);
  expect(moviesResponse.body[0].year).toBe(testMovie.year);
  expect(moviesResponse.body[0].country).toBe(testMovie.country);
});
*/
