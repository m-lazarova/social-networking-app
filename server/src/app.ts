import * as express from 'express';
import feedRoutes from './routes/feed';

const app = express();

app.use('/feed', feedRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
