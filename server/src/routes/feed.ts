import { createPost, getPosts } from '../controllers/feed';
import * as express from 'express';

const router = express.Router();

router.get('/posts', getPosts);

router.post('/post', createPost);

export default router;
