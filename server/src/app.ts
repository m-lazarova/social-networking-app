import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import feedRoutes from './routes/feed';

const app = express();

app.use(cors());

app.use(bodyParser.json());

const mongoDB = process.env.MONGODB_URL;
if (!mongoDB) {
  throw new Error('MONGODB_URL environment variable is not set');
}
mongoose.connect(mongoDB).then(result =>
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  })
).catch(err => console.log(err));


app.use('/feed', feedRoutes);
