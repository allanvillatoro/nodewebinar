# Improving code quality in Node.js

This project serves as a demonstration of best practices in modern Node.js and TypeScript development, with a strong focus on code quality, maintainability, and automated testing. It incorporates the following key practices and tools:

- `Strict TypeScript Configuration` – Enforcing type safety and catching potential errors at compile time.
- `Code Formatting & Linting` – Using ESLint and Prettier to maintain a consistent code style.
- `Pre-commit Hooks` – Utilizing Husky to ensure code quality checks before commits.
- `Testing Strategy` – Implementing both unit tests and integration tests to verify functionality.
- `Continuous Integration` – Leveraging GitHub Actions to automate tests and quality checks on every push and pull request.
- `Code Analysis with SonarQube` – Ensuring code reliability, security, and maintainability.

By integrating these tools and workflows, this project demonstrates how to build a robust, scalable, and well-tested Node.js application.

## Installation

```bash

# install dependencies
$ npm ci
```

## Running the app

```bash

# start postgres docker container
$ npm run localdb:up

# start app locally
$ npm run dev

```

## Running tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:coverage
```

[Check Unit Testing Handbook](./docs/UNIT_TESTS.md)

## About the application

This application allows you to create a movie database. Anonymous uses can review every movie with a rating and comments.

### Routes:

1. **Movies:**

   - **POST `/movies`**: To add a new movie.
   - **PUT `/movies/:movieId`**: To update an existing movie.
   - **GET `/movies/top-five`**: To get the top 5 highest-rated movies.
   - **GET `/movies/:movieId`**: To get a movie by its ID.
   - **GET `/movies`**: To get all movies.

2. **Movie Reviews:**
   - **POST `/movies/reviews`**: To add a new review for a movie.
   - **PUT `/movies/reviews/:movieReviewId`**: To update an existing review.
   - **GET `/movies/reviews/:movieReviewId`**: To get a review by its ID.
   - **GET `/movies/:movieId/reviews`**: To get all reviews for a specific movie.
   - **DELETE `/movies/:movieId/reviews`**: To delete all reviews for a specific movie.

[Check Postman documentation](https://documenter.getpostman.com/view/818109/2sAYX9ogPD)
