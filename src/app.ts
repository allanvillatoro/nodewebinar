import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { MovieRouter } from './routes/movie.routes';
import errorMiddleware from './middlewares/errorMiddleware';
import { IDataSource } from './types/datasource';

class App {
  public app: Application;
  public baseUrl: string = '/api';
  private dataSource: IDataSource;
  private name = 'movies';

  constructor(dataSource: IDataSource) {
    this.dataSource = dataSource;
    this.app = express();
    this.middleware();
    this.routes();
    this.handleErrors();
  }

  private middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(this.baseUrl, new MovieRouter(this.dataSource).getRouter());
    this.routes404();
  }

  private routes404() {
    this.app.use((req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).send('Invalid route.');
    });
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }
}

export default App;
