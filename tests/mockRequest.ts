import App from '../src/app';
import { testAppDataSource } from './testDatabase';
import request from 'supertest';

//Make sure the data source is the test database for the integration test
const app = new App(testAppDataSource).app;

export async function mockRequest({
  path,
  action,
  body,
}: {
  path: string;
  action: 'get' | 'post' | 'put' | 'delete';
  body?: Record<string, unknown>;
}) {
  console.log(
    `Calling ${action.toUpperCase()} ${path} ${body ? `with body: ${JSON.stringify(body)}` : ''}`,
  );
  const response = await request(app)[action](path).send(body);
  console.log(`Response status: ${response.status}`);
  console.log(`Response body: ${JSON.stringify(response.body)}`);
  return response;
}
