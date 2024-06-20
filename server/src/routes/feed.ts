import { getPosts } from '../controllers/feed';
import * as express from 'express';

const router = express.Router();

router.get('/posts', getPosts);

export default router;
