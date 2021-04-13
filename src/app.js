import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import 'dotenv/config';

import swagger from 'swagger-ui-express';
import docs from './docs';

import AppError from './shared/Errors/AppError';
class App {
  constructor () {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  database() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  routes() {
    this.express.use(routes);
    this.express.use('/api-docs', swagger.serve, swagger.setup(docs));
  }

  exceptionHandler() {
    this.express.use((err, req, res, next) => {
      if (err.message && err.statusCode) {
        return res.status(err.statusCode).json({ status: 'error', error: err.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error!' });
    });
 }
}

export default new App().express