import { Router } from 'express';
import postsService from './posts.service';

const postsController = Router();

postsController.post('/:boardId', postsService.createPost);

postsController.get('/', postsService.getPublicPosts);

postsController.get('/front-end', postsService.getFrontEndPosts);

postsController.get('/back-end', postsService.getBackEndPosts);

postsController.put('/:postId', postsService.updatePost);

postsController.delete('/:postId', postsService.deletePost);

export default postsController;
