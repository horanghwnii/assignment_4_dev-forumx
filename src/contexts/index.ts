import { Router } from 'express';
import authController from './auth/auth.controller';
import commentsController from './comments/comments.controller';
import likeController from './like/like.controller';
import postsController from './posts/posts.controller';

const controllers = Router();

controllers.use('/auth', authController);

controllers.use('/', postsController);

controllers.use('/posts', likeController);

controllers.use('/posts', commentsController);

export default controllers;
