import { Router } from 'express';
import likeService from './like.service';

const likeController = Router();

likeController.post('/:postId/likes/:userId', likeService.createLikedPost);

likeController.get('/:userId/liked-posts', likeService.getLikedPosts);

likeController.delete('/:postId/likes/:userId', likeService.deleteLikedPost);

export default likeController;
