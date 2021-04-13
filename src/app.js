import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import 'dotenv/config';

class App {
  constructor () {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  database() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  routes() {
    this.express.use(routes)
  }
}

export default new App().express