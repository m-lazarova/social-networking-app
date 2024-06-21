import { createPost, getPosts } from '../controllers/feed';
import * as express from 'express';
import { body } from 'express-validator'

const router = express.Router();

router.get('/posts', getPosts);

router.post('/post',
    body(['title', 'content']).trim().isLength({ min: 5 }),
    createPost);

export default router;
