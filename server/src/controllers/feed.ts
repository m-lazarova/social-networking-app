import { NextFunction, Request, Response } from 'express';

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
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

export const createPost = (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post created',
        post: {
            id: new Date().toISOString(),
            title,
            content,
        }
    })
}