import { Request, Response } from 'express';

export const getPosts = (req: Request, res: Response, _next: any) => {
  res.status(200).json({ posts: [{ title: 'First Post', content: 'This is the first post' }] });
};
