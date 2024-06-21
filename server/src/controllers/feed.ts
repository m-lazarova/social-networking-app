import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/post';

export const getPosts = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        posts: [{
            _id: 1,
            title: 'First Post',
            content: 'This is the first post',
            imageUrl: '',
            creator: {
                name: 'Author'
            },
            createdAt: new Date(),
        }]
    });
};

export const createPost = (req: Request, res: Response, _next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title,
        content,
        imageUrl: '',
        creator: { name: 'Mariya' }
    });
    console.log(post);
    post.save().then(result => {
        res.status(201).json({
            message: 'Post created successfully',
            post: result
        })
    }).catch(err => console.log(err));
}