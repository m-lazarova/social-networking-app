import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import feedRoutes from './routes/feed';

const app = express();

app.use(cors());

app.use(bodyParser.json());


app.use('/feed', feedRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
