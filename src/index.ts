import App from './app';
import dotenv from 'dotenv';
import { AppDataSource, initializeDatabase } from './config/database';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = new App(AppDataSource).app;

const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
